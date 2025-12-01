<?php

namespace App\Services;

use App\Models\UserSimulation;
use App\Models\ScenarioOption;
use App\Models\Scenario;

class ScoringService
{
    /**
     * Calculate score for a given option selection by ID
     */
    public function calculateOptionScore($optionId): int
    {
        $option = ScenarioOption::find($optionId);
        return $option ? $option->score_impact : 0;
    }

    /**
     * Calculate grade based on completion percentage
     */
    public function calculateGrade(float $percentage): string
    {
        if ($percentage >= 90) return 'A';
        if ($percentage >= 80) return 'B';
        if ($percentage >= 70) return 'C';
        if ($percentage >= 60) return 'D';
        return 'F';
    }

    /**
     * Generate result summary text
     */
    public function generateResultSummary(float $score): string
    {
        if ($score >= 90) {
            return 'Outstanding performance! You demonstrated excellent decision-making skills.';
        } elseif ($score >= 80) {
            return 'Great job! You showed strong understanding of the profession.';
        } elseif ($score >= 70) {
            return 'Good work! You have a solid grasp of the key concepts.';
        } elseif ($score >= 60) {
            return 'Fair performance. Keep practicing to improve your skills.';
        } else {
            return 'Keep learning! Review the scenarios and try again.';
        }
    }

    /**
     * Calculate total simulation score
     */
    public function calculateSimulationScore(UserSimulation $simulation): array
    {
        $answers = $simulation->answers()->with('scenarioOption')->get();
        
        $totalScore = 0;
        $maxPossibleScore = 0;
        $skillBreakdown = [];

        foreach ($answers as $answer) {
            $totalScore += $answer->score_earned;
            
            // Calculate skill breakdown
            $option = $answer->scenarioOption;
            if ($option && $option->skill_weights) {
                foreach ($option->skill_weights as $skill => $weight) {
                    if (!isset($skillBreakdown[$skill])) {
                        $skillBreakdown[$skill] = 0;
                    }
                    $skillBreakdown[$skill] += $answer->score_earned * $weight;
                }
            }
        }

        // Calculate max possible score
        $scenarios = Scenario::where('profession_id', $simulation->profession_id)
            ->with('options')
            ->get();

        foreach ($scenarios as $scenario) {
            $maxPossibleScore += $scenario->options->max('score_impact') ?? 0;
        }

        $completionPercentage = $maxPossibleScore > 0 
            ? ($totalScore / $maxPossibleScore) * 100 
            : 0;

        return [
            'total_score' => $totalScore,
            'max_possible_score' => $maxPossibleScore,
            'completion_percentage' => round($completionPercentage, 2),
            'skill_breakdown' => $skillBreakdown,
            'grade' => $this->calculateGrade($completionPercentage),
        ];
    }

    /**
     * Generate detailed result summary
     */
    public function generateDetailedResultSummary(UserSimulation $simulation): array
    {
        $answers = $simulation->answers()->with(['scenario', 'scenarioOption'])->get();
        
        $correctChoices = 0;
        $totalChoices = $answers->count();
        $scenarioResults = [];

        foreach ($answers as $answer) {
            if ($answer->scenarioOption->is_best_choice) {
                $correctChoices++;
            }

            $scenarioResults[] = [
                'scenario_id' => $answer->scenario_id,
                'scenario_title' => $answer->scenario->title,
                'selected_option' => $answer->scenarioOption->option_text,
                'score_earned' => $answer->score_earned,
                'was_best_choice' => $answer->scenarioOption->is_best_choice,
                'explanation' => $answer->scenarioOption->explanation,
            ];
        }

        return [
            'correct_choices' => $correctChoices,
            'total_choices' => $totalChoices,
            'accuracy' => $totalChoices > 0 ? round(($correctChoices / $totalChoices) * 100, 2) : 0,
            'scenario_results' => $scenarioResults,
        ];
    }

    /**
     * Award XP based on performance
     */
    public function calculateXpReward(float $completionPercentage): int
    {
        $baseXp = 100;
        
        if ($completionPercentage >= 90) {
            return $baseXp * 2; // 200 XP for excellent performance
        } elseif ($completionPercentage >= 75) {
            return (int)($baseXp * 1.5); // 150 XP for good performance
        } elseif ($completionPercentage >= 60) {
            return $baseXp; // 100 XP for passing
        } else {
            return (int)($baseXp * 0.5); // 50 XP for participation
        }
    }
}
