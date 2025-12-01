<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Scenario extends Model
{
    protected $fillable = [
        'profession_id',
        'title',
        'description',
        'context',
        'order',
        'difficulty',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'difficulty' => 'integer',
        'order' => 'integer',
    ];

    public function profession(): BelongsTo
    {
        return $this->belongsTo(Profession::class);
    }

    public function options(): HasMany
    {
        return $this->hasMany(ScenarioOption::class);
    }

    public function bestChoice(): HasMany
    {
        return $this->options()->where('is_best_choice', true);
    }

    public function userAnswers(): HasMany
    {
        return $this->hasMany(UserAnswer::class);
    }

    public function getMaxPossibleScore(): int
    {
        return $this->options()->max('score_impact') ?? 0;
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
