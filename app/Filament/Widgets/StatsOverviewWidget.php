<?php

namespace App\Filament\Widgets;

use App\Models\Badge;
use App\Models\Profession;
use App\Models\UserSimulation;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverviewWidget extends BaseWidget
{
    protected function getStats(): array
    {
        $totalUsers = User::count();
        $totalSimulations = UserSimulation::count();
        $completedSimulations = UserSimulation::whereNotNull('completed_at')->count();
        $totalProfessions = Profession::count();
        $totalBadges = Badge::count();
        $activeUsers = User::whereHas('simulations', function ($query) {
            $query->where('created_at', '>=', now()->subDays(7));
        })->count();

        return [
            Stat::make('Total Pengguna', $totalUsers)
                ->description('Pengguna terdaftar')
                ->descriptionIcon('heroicon-m-users')
                ->color('success')
                ->chart([7, 12, 18, 25, 32, 38, $totalUsers]),
            
            Stat::make('Total Simulasi', $totalSimulations)
                ->description($completedSimulations . ' selesai')
                ->descriptionIcon('heroicon-m-play-circle')
                ->color('primary')
                ->chart([15, 28, 42, 56, 71, 85, $totalSimulations]),
            
            Stat::make('Pengguna Aktif (7 Hari)', $activeUsers)
                ->description('Melakukan simulasi minggu ini')
                ->descriptionIcon('heroicon-m-fire')
                ->color('warning')
                ->chart([3, 8, 12, 18, 23, 28, $activeUsers]),
            
            Stat::make('Total Profesi', $totalProfessions)
                ->description('Profesi tersedia')
                ->descriptionIcon('heroicon-m-briefcase')
                ->color('info'),
        ];
    }
}
