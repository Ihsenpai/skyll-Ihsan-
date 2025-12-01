<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_simulation_id',
        'scenario_id',
        'scenario_option_id',
        'score_earned',
        'time_taken_seconds',
    ];

    protected $casts = [
        'score_earned' => 'integer',
        'time_taken_seconds' => 'integer',
    ];

    public function userSimulation(): BelongsTo
    {
        return $this->belongsTo(UserSimulation::class);
    }

    public function scenario(): BelongsTo
    {
        return $this->belongsTo(Scenario::class);
    }

    public function selectedOption(): BelongsTo
    {
        return $this->belongsTo(ScenarioOption::class, 'scenario_option_id');
    }

    // Alias to support existing service methods expecting scenarioOption
    public function scenarioOption(): BelongsTo
    {
        return $this->belongsTo(ScenarioOption::class, 'scenario_option_id');
    }
}
