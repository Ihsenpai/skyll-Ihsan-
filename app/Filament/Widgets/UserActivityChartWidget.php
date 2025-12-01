<?php

namespace App\Filament\Widgets;

use App\Models\UserSimulation;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class UserActivityChartWidget extends ChartWidget
{
    protected ?string $heading = 'Aktivitas Simulasi (7 Hari Terakhir)';
    
    protected static ?int $sort = 3;

    protected function getData(): array
    {
        $data = UserSimulation::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as count')
            )
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $labels = [];
        $values = [];

        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            $labels[] = now()->subDays($i)->format('d M');
            
            $dayData = $data->firstWhere('date', $date);
            $values[] = $dayData ? $dayData->count : 0;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Simulasi',
                    'data' => $values,
                    'backgroundColor' => 'rgba(59, 130, 246, 0.5)',
                    'borderColor' => 'rgb(59, 130, 246)',
                    'fill' => true,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
