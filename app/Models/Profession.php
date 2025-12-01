<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Profession extends Model
{
    protected $fillable = [
        'name',
        'description',
        'icon',
        'category',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function scenarios(): HasMany
    {
        return $this->hasMany(Scenario::class)->orderBy('order');
    }

    public function activeScenarios(): HasMany
    {
        return $this->scenarios()->where('is_active', true);
    }

    public function learningModules(): HasMany
    {
        return $this->hasMany(LearningModule::class)->orderBy('order');
    }

    public function activeLearningModules(): HasMany
    {
        return $this->learningModules()->where('is_active', true);
    }

    public function userSimulations(): HasMany
    {
        return $this->hasMany(UserSimulation::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
