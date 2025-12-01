<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfessionController;
use App\Http\Controllers\SimulationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LearningModuleController;
use App\Models\Profession;
use App\Models\User;
use App\Models\Badge;

// Welcome Page
Route::get('/', function () {
    $professions = Profession::withCount('scenarios')->take(6)->get();
    $badges = Badge::take(8)->get();
    $totalUsers = User::count();
    
    return Inertia::render('Welcome', [
        'professions' => $professions,
        'badges' => $badges,
        'totalUsers' => $totalUsers,
    ]);
});

// Auth Routes
Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');

Route::get('/register', function () {
    return Inertia::render('Register');
})->name('register');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    // Dashboard
    Route::get('/dashboard', function () {
        $user = auth()->user();
        
        $stats = [
            'total_xp' => $user->xp,
            'completed_simulations' => $user->userSimulations()->where('status', 'completed')->count(),
            'badges_count' => $user->userBadges()->count(),
        ];
        
        $recentSimulations = $user->userSimulations()
            ->with('profession')
            ->where('status', 'completed')
            ->latest('completed_at')
            ->take(5)
            ->get();
            
        $badges = $user->userBadges()
            ->with('badge')
            ->latest()
            ->take(6)
            ->get()
            ->pluck('badge');
        
        return Inertia::render('Dashboard', [
            'user' => $user,
            'stats' => $stats,
            'recentSimulations' => $recentSimulations,
            'badges' => $badges,
        ]);
    })->name('dashboard');
    
    // Professions
    Route::get('/professions', function () {
        $user = auth()->user();
        $professions = Profession::withCount('scenarios')->get();
        
        return Inertia::render('Professions', [
            'user' => $user,
            'professions' => $professions,
        ]);
    })->name('professions.index');
    
    // My Simulations
    Route::get('/my-simulations', function () {
        $user = auth()->user();
        $simulations = $user->userSimulations()
            ->with('profession')
            ->latest()
            ->get();
        
        return Inertia::render('MySimulations', [
            'user' => $user,
            'simulations' => $simulations,
        ]);
    })->name('my-simulations');
    
    // Badges
    Route::get('/badges', function () {
        $user = auth()->user();
        $userBadges = $user->userBadges()->with('badge')->get();
        $allBadges = Badge::all();
        
        return Inertia::render('Badges', [
            'user' => $user,
            'userBadges' => $userBadges,
            'allBadges' => $allBadges,
        ]);
    })->name('badges');
    
    // Leaderboard
    Route::get('/leaderboard', function () {
        $user = auth()->user();
        $topUsers = \App\Models\User::orderBy('xp', 'desc')->take(50)->get();
        
        return Inertia::render('Leaderboard', [
            'user' => $user,
            'topUsers' => $topUsers,
            'currentUserRank' => \App\Models\User::where('xp', '>', $user->xp)->count() + 1,
        ]);
    })->name('leaderboard');
    
    // Settings
    Route::get('/settings', function () {
        $user = auth()->user();
        
        return Inertia::render('Settings', [
            'user' => $user,
        ]);
    })->name('settings');
    
    // Learning Modules
    Route::get('/learning', [LearningModuleController::class, 'index'])->name('learning.index');
    Route::get('/learning/profession/{profession}', [LearningModuleController::class, 'byProfession'])->name('learning.profession');
    Route::get('/learning/{learningModule}', [LearningModuleController::class, 'show'])->name('learning.show');
    Route::get('/learning/{learningModule}/download', [LearningModuleController::class, 'download'])->name('learning.download');
    Route::post('/learning/{learningModule}/complete', [LearningModuleController::class, 'complete'])->name('learning.complete');
    
    // Simulations
    Route::get('/daily-challenge', [SimulationController::class, 'daily'])->name('simulations.daily');
    Route::get('/simulations/{profession}/start', [SimulationController::class, 'start'])
        ->name('simulations.start');
    
    // Submit simulation answers (frontend posts here)
    Route::post('/api/simulations/submit', [SimulationController::class, 'submit'])
        ->middleware('throttle:10,1')
        ->name('simulations.submit');

    Route::get('/simulations/{simulation}/results', [SimulationController::class, 'results'])
        ->name('simulations.results');
});

