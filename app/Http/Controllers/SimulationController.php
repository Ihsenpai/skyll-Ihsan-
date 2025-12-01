<?php

namespace App\Http\Controllers;

use App\Models\Profession;
use App\Models\UserSimulation;
use App\Models\UserAnswer;
use App\Models\ScenarioOption;
use App\Models\Badge;
use App\Services\ScoringService;
use App\Services\HuggingFaceService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SimulationController extends Controller
{
    protected $scoringService;
    protected $huggingFaceService;

    public function __construct(ScoringService $scoringService, HuggingFaceService $huggingFaceService)
    {
        $this->scoringService = $scoringService;
        $this->huggingFaceService = $huggingFaceService;
    }

    public function start(Profession $profession)
    {
        $scenarios = $profession->scenarios()
            ->with('options')
            ->active()
            ->orderBy('order')
            ->get();

        if ($scenarios->isEmpty()) {
            return redirect()->route('professions.index')
                ->with('error', 'No scenarios available for this profession.');
        }

        return Inertia::render('Simulation', [
            'profession' => $profession,
            'scenarios' => $scenarios
        ]);
    }

    public function daily()
    {
        $profession = Profession::whereHas('scenarios', function ($q) {
                $q->active();
            })
            ->inRandomOrder()
            ->first();

        if (!$profession) {
            return redirect()->route('professions.index')
                ->with('error', 'Tidak ada skenario harian yang tersedia.');
        }

        $scenarios = $profession->scenarios()
            ->with('options')
            ->active()
            ->inRandomOrder()
            ->take(3)
            ->get();

        if ($scenarios->isEmpty()) {
            return redirect()->route('professions.index')
                ->with('error', 'Tidak ada skenario aktif untuk tantangan harian.');
        }

        return Inertia::render('Simulation', [
            'profession' => $profession,
            'scenarios' => $scenarios,
            'isDaily' => true,
        ]);
    }

    public function submit(Request $request)
    {
        $validated = $request->validate([
            'profession_id' => 'required|exists:professions,id',
            'answers' => 'required|array',
            'answers.*.scenario_id' => 'required|exists:scenarios,id',
            'answers.*.selected_option_id' => 'required|exists:scenario_options,id',
            'answers.*.time_taken_seconds' => 'nullable|integer|min:0',
            'is_daily' => 'nullable|boolean',
        ]);

        DB::beginTransaction();
        try {
            // Create simulation record
            $simulation = UserSimulation::create([
                'user_id' => auth()->id(),
                'profession_id' => $validated['profession_id'],
                'total_score' => 0,
                'max_possible_score' => 0,
                'completion_percentage' => 0,
                'status' => 'in_progress',
            ]);

            // Save answers and calculate scores
            $totalScore = 0;
            $scenarioIds = [];
            foreach ($validated['answers'] as $answerData) {
                $score = $this->scoringService->calculateOptionScore($answerData['selected_option_id']);
                
                UserAnswer::create([
                    'user_simulation_id' => $simulation->id,
                    'scenario_id' => $answerData['scenario_id'],
                    'scenario_option_id' => $answerData['selected_option_id'],
                    'score_earned' => $score,
                    'time_taken_seconds' => $answerData['time_taken_seconds'] ?? null,
                ]);

                $totalScore += $score;
                $scenarioIds[] = $answerData['scenario_id'];
            }

            // Calculate max possible score from selected scenarios (best option per scenario)
            $scenarioIds = array_values(array_unique($scenarioIds));
            $maxPossibleScore = 0;
            if (!empty($scenarioIds)) {
                $maxPossibleScore = (int) ScenarioOption::whereIn('scenario_id', $scenarioIds)
                    ->select('scenario_id', DB::raw('MAX(score_impact) as max_score'))
                    ->groupBy('scenario_id')
                    ->pluck('max_score')
                    ->sum();
            }

            // Calculate completion percentage, grade and XP
            $completionPercentage = $maxPossibleScore > 0 ? ($totalScore / $maxPossibleScore) * 100 : 0;
            $grade = $this->scoringService->calculateGrade($completionPercentage);
            $xpEarned = $this->scoringService->calculateXpReward($completionPercentage);
            // Apply small speed bonus based on average answer time
            $avgTime = null;
            if (!empty($validated['answers'])) {
                $times = array_filter(array_map(function ($a) {
                    return $a['time_taken_seconds'] ?? null;
                }, $validated['answers']), fn($v) => $v !== null);
                if (!empty($times)) {
                    $avgTime = array_sum($times) / count($times);
                    if ($avgTime <= 5) {
                        $xpEarned = (int) round($xpEarned * 1.4);
                    } elseif ($avgTime <= 10) {
                        $xpEarned = (int) round($xpEarned * 1.2);
                    }
                }
            }

            // Update simulation
            $simulation->update([
                'total_score' => (int) $totalScore,
                'max_possible_score' => (int) $maxPossibleScore,
                'completion_percentage' => round($completionPercentage, 2),
                'grade' => $grade,
                'xp_earned' => $xpEarned,
                'status' => 'completed',
                'completed_at' => now(),
            ]);

            // Update user XP
            $user = auth()->user();
            $user->increment('xp', $xpEarned);
            $awardedDaily = false;

            // Daily challenge bonus and badge
            if ($request->boolean('is_daily')) {
                $badge = Badge::firstOrCreate(
                    ['name' => 'Daily Challenger'],
                    [
                        'description' => 'Completed a daily challenge',
                        'icon' => 'ph:calendar-check-bold',
                        'color' => '#10B981',
                        'xp_reward' => 50,
                        'criteria' => ['type' => 'daily'],
                    ]
                );

                $already = $user->badges()
                    ->where('badges.id', $badge->id)
                    ->whereDate('user_badges.earned_at', now()->toDateString())
                    ->exists();

                if (!$already) {
                    $user->badges()->syncWithoutDetaching([
                        $badge->id => ['earned_at' => now()],
                    ]);
                    if (!empty($badge->xp_reward)) {
                        $user->increment('xp', (int) $badge->xp_reward);
                    }
                    $awardedDaily = true;
                }
            }

            DB::commit();

            // Redirect to results page with flash message
            $msg = 'Simulasi selesai. XP +' . $xpEarned;
            if ($request->boolean('is_daily')) {
                $msg .= $awardedDaily ? ' · Badge Daily Challenger didapat!'
                    : ' · Tantangan Harian sudah diambil hari ini.';
            }
            return redirect()->route('simulations.results', $simulation->id)
                ->with('success', $msg);

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to submit simulation. Please try again.');
        }
    }

    public function results(UserSimulation $simulation)
    {
        // Ensure user owns this simulation
        if ($simulation->user_id !== auth()->id()) {
            abort(403);
        }

        $simulation->load([
            'profession',
            'userAnswers.scenario',
            'userAnswers.selectedOption'
        ]);

        // Compute accuracy and skill breakdown
        $scoreData = $this->scoringService->calculateSimulationScore($simulation);
        $detail = $this->scoringService->generateDetailedResultSummary($simulation);

        $results = [
            'grade' => $simulation->grade,
            'total_score' => $simulation->total_score,
            'xp_earned' => $simulation->xp_earned,
            'summary' => $this->scoringService->generateResultSummary($simulation->total_score),
            'accuracy' => $detail['accuracy'] ?? null,
            'correct_choices' => $detail['correct_choices'] ?? null,
            'total_choices' => $detail['total_choices'] ?? null,
            'skill_breakdown' => $scoreData['skill_breakdown'] ?? [],
        ];

        // Prepare data for AI feedback
        $totalChoices = $simulation->userAnswers->count();
        $correctChoices = $simulation->userAnswers->filter(function ($ans) {
            return optional($ans->selectedOption)->is_best_choice === true;
        })->count();

        $aiData = [
            'profession_name' => $simulation->profession->name,
            'completion_percentage' => (float) $simulation->completion_percentage,
            'correct_choices' => $correctChoices,
            'total_choices' => $totalChoices,
            'skill_breakdown' => [],
        ];

        // Generate AI feedback (service handles its own fallback)
        $aiFeedback = $this->huggingFaceService->generateFeedback($aiData);

        return Inertia::render('Results', [
            'simulation' => $simulation,
            'profession' => $simulation->profession,
            'results' => $results,
            'aiFeedback' => $aiFeedback,
        ]);
    }
}
