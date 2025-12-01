<?php

namespace App\Http\Controllers;

use App\Models\LearningModule;
use App\Models\Profession;
use App\Models\UserLearningProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LearningModuleController extends Controller
{
    public function index()
    {
        $professions = Profession::with(['activeLearningModules' => function ($query) {
            $query->orderBy('order');
        }])->where('is_active', true)->get();

        return inertia('Learning', [
            'user' => auth()->user(),
            'professions' => $professions->map(function ($profession) {
                return [
                    'id' => $profession->id,
                    'name' => $profession->name,
                    'description' => $profession->description,
                    'icon' => $profession->icon,
                    'active_learning_modules' => $profession->activeLearningModules->map(function ($module) {
                        return [
                            'id' => $module->id,
                        ];
                    }),
                ];
            }),
        ]);
    }

    public function byProfession(Profession $profession)
    {
        $modules = $profession->activeLearningModules()->orderBy('order')->get();

        // Check completion status for authenticated users
        if (auth()->check()) {
            foreach ($modules as $module) {
                $module->is_completed = $module->isCompletedBy(auth()->user());
            }
        }

        return inertia('LearningByProfession', [
            'user' => auth()->user(),
            'profession' => [
                'id' => $profession->id,
                'name' => $profession->name,
                'description' => $profession->description,
                'icon' => $profession->icon,
            ],
            'modules' => $modules->map(function ($module) {
                return [
                    'id' => $module->id,
                    'title' => $module->title,
                    'description' => $module->description,
                    'duration_minutes' => $module->duration_minutes,
                    'is_completed' => $module->is_completed ?? false,
                ];
            }),
        ]);
    }

    public function show(LearningModule $learningModule)
    {
        $learningModule->load('profession');
        
        // Get user progress if authenticated
        $progress = null;
        if (auth()->check()) {
            $progress = UserLearningProgress::firstOrCreate([
                'user_id' => auth()->id(),
                'learning_module_id' => $learningModule->id,
            ]);
        }

        // Get other modules from same profession
        $otherModules = $learningModule->profession->activeLearningModules()
            ->where('id', '!=', $learningModule->id)
            ->take(3)
            ->get();

        return inertia('LearningShow', [
            'user' => auth()->user(),
            'learningModule' => [
                'id' => $learningModule->id,
                'title' => $learningModule->title,
                'description' => $learningModule->description,
                'duration_minutes' => $learningModule->duration_minutes,
                'file_size' => $learningModule->file_size,
                'profession' => [
                    'id' => $learningModule->profession->id,
                    'name' => $learningModule->profession->name,
                    'icon' => $learningModule->profession->icon,
                ],
            ],
            'progress' => $progress ? [
                'is_completed' => $progress->is_completed,
                'completed_at' => $progress->completed_at,
            ] : null,
            'otherModules' => $otherModules->map(function ($module) {
                return [
                    'id' => $module->id,
                    'title' => $module->title,
                    'duration_minutes' => $module->duration_minutes,
                ];
            }),
        ]);
    }

    public function download(LearningModule $learningModule)
    {
        if (!Storage::exists($learningModule->pdf_file)) {
            abort(404, 'File tidak ditemukan');
        }

        return Storage::download($learningModule->pdf_file, $learningModule->title . '.pdf');
    }

    public function complete(LearningModule $learningModule)
    {
        $progress = UserLearningProgress::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'learning_module_id' => $learningModule->id,
            ],
            [
                'is_completed' => true,
                'completed_at' => now(),
            ]
        );

        // Award XP for completing learning module
        auth()->user()->addXp(10);

        return redirect()->back()->with('success', 'Materi telah ditandai selesai! +10 XP');
    }
}
