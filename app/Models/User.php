<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'xp',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get user simulations
     */
    public function userSimulations(): HasMany
    {
        return $this->hasMany(UserSimulation::class);
    }

    /**
     * Alias for userSimulations (for compatibility)
     */
    public function simulations(): HasMany
    {
        return $this->userSimulations();
    }

    /**
     * Get user badges
     */
    public function badges(): BelongsToMany
    {
        return $this->belongsToMany(Badge::class, 'user_badges')
            ->withTimestamps()
            ->withPivot('earned_at');
    }

    /**
     * Pivot records for user badges (award instances)
     */
    public function userBadges(): HasMany
    {
        return $this->hasMany(UserBadge::class);
    }

    /**
     * Get user learning progress
     */
    public function learningProgress(): HasMany
    {
        return $this->hasMany(UserLearningProgress::class);
    }

    /**
     * Add XP to user
     */
    public function addXp(int $amount): void
    {
        $this->increment('xp', $amount);
    }

    /**
     * Award badge to user
     */
    public function awardBadge(Badge $badge): void
    {
        if (!$this->badges()->where('badge_id', $badge->id)->exists()) {
            $this->badges()->attach($badge->id, ['earned_at' => now()]);
            $this->addXp($badge->xp_reward);
        }
    }

    /**
     * Check if user is admin
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Check if user is guest
     */
    public function isGuest(): bool
    {
        return $this->role === 'guest';
    }
}
