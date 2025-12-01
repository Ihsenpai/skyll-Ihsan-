<?php

namespace App\Filament\Widgets;

use App\Models\UserSimulation;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class LatestSimulationsWidget extends BaseWidget
{
    protected int | string | array $columnSpan = 'full';
    
    protected static ?int $sort = 2;

    public function table(Table $table): Table
    {
        return $table
            ->query(
                UserSimulation::with(['user', 'profession'])
                    ->latest()
                    ->limit(10)
            )
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Pengguna')
                    ->searchable()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('profession.name')
                    ->label('Profesi')
                    ->searchable()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('total_score')
                    ->label('Skor')
                    ->sortable()
                    ->badge()
                    ->color(fn ($state) => $state >= 80 ? 'success' : ($state >= 60 ? 'warning' : 'danger')),
                
                Tables\Columns\TextColumn::make('grade')
                    ->label('Nilai')
                    ->badge()
                    ->color(fn ($state) => match($state) {
                        'A' => 'success',
                        'B' => 'info',
                        'C' => 'warning',
                        default => 'danger',
                    }),
                
                Tables\Columns\IconColumn::make('completed_at')
                    ->label('Status')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-clock')
                    ->trueColor('success')
                    ->falseColor('warning'),
                
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc');
    }

    protected function getTableHeading(): string
    {
        return 'Simulasi Terbaru';
    }
}
