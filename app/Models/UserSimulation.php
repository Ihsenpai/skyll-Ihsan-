<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UserSimulation extends Model
{
    protected $fillable = [
        'user_id',
        'profession_id',
        'session_id',
        'total_score',
        'max_possible_score',
        'completion_percentage',
        'grade',
        'xp_earned',
        'skill_breakdown',
        'result_summary',
        'ai_feedback',
        'status',
        'completed_at',
    ];

    protected $casts = [
        'skill_breakdown' => 'array',
        'result_summary' => 'array',
        'completion_percentage' => 'decimal:2',
        'total_score' => 'integer',
        'max_possible_score' => 'integer',
        'xp_earned' => 'integer',
        'completed_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function profession(): BelongsTo
    {
        return $this->belongsTo(Profession::class);
    }

    public function answers(): HasMany
    {
        return $this->hasMany(UserAnswer::class);
    }

    public function userAnswers(): HasMany
    {
        return $this->hasMany(UserAnswer::class);
    }

    public function calculateScore(): void
    {
        $this->total_score = $this->answers()->sum('score_earned');
        $this->completion_percentage = $this->max_possible_score > 0
            ? ($this->total_score / $this->max_possible_score) * 100
            : 0;
        $this->save();
    }

    public function markAsCompleted(): void
    {
        $this->update([
            'status' => 'completed',
            'completed_at' => now(),
        ]);
    }

    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeForUser($query, $userId = null, $sessionId = null)
    {
        return $query->where(function ($q) use ($userId, $sessionId) {
            if ($userId) {
                $q->where('user_id', $userId);
            }
            if ($sessionId) {
                $q->orWhere('session_id', $sessionId);
            }
        });
    }
}
