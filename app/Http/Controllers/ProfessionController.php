<?php

namespace App\Http\Controllers;

use App\Models\Profession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfessionController extends Controller
{
    public function index()
    {
        $professions = Profession::withCount('scenarios')
            ->orderBy('name')
            ->get();

        return Inertia::render('Professions', [
            'professions' => $professions
        ]);
    }

    public function show(Profession $profession)
    {
        $profession->load('scenarios.options');

        return response()->json($profession);
    }
}
