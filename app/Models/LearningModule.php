<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LearningModule extends Model
{
    protected $fillable = [
        'profession_id',
        'title',
        'description',
        'pdf_file',
        'file_size',
        'order',
        'duration_minutes',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function profession(): BelongsTo
    {
        return $this->belongsTo(Profession::class);
    }

    public function userProgress(): HasMany
    {
        return $this->hasMany(UserLearningProgress::class);
    }

    public function isCompletedBy(User $user): bool
    {
        return $this->userProgress()
            ->where('user_id', $user->id)
            ->where('is_completed', true)
            ->exists();
    }
}
