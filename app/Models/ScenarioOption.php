<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ScenarioOption extends Model
{
    protected $fillable = [
        'scenario_id',
        'option_text',
        'explanation',
        'score_impact',
        'skill_weights',
        'is_best_choice',
    ];

    protected $casts = [
        'skill_weights' => 'array',
        'is_best_choice' => 'boolean',
        'score_impact' => 'integer',
    ];

    public function scenario(): BelongsTo
    {
        return $this->belongsTo(Scenario::class);
    }

    public function userAnswers(): HasMany
    {
        return $this->hasMany(UserAnswer::class);
    }

    public function getSkillScores(): array
    {
        $weights = $this->skill_weights ?? [];
        $scores = [];

        foreach ($weights as $skill => $weight) {
            $scores[$skill] = $this->score_impact * $weight;
        }

        return $scores;
    }
}
