<?php

namespace App\Filament\Resources\Badges\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class BadgeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nama Lencana')
                    ->required()
                    ->maxLength(255)
                    ->placeholder('Contoh: Pemula yang Rajin'),
                
                Textarea::make('description')
                    ->label('Deskripsi')
                    ->required()
                    ->rows(3)
                    ->placeholder('Jelaskan cara mendapatkan lencana ini...')
                    ->columnSpanFull(),
                
                TextInput::make('icon')
                    ->label('Icon (Emoji)')
                    ->maxLength(255)
                    ->placeholder('🏆')
                    ->helperText('Gunakan emoji sebagai icon'),
                
                Select::make('type')
                    ->label('Tipe Lencana')
                    ->options([
                        'bronze' => 'Bronze',
                        'silver' => 'Silver',
                        'gold' => 'Gold',
                        'platinum' => 'Platinum',
                    ])
                    ->default('bronze')
                    ->required(),
                
                TextInput::make('xp_reward')
                    ->label('XP Reward')
                    ->numeric()
                    ->default(0)
                    ->required()
                    ->minValue(0)
                    ->suffix('XP'),
                
                Textarea::make('unlock_criteria')
                    ->label('Kriteria Unlock (JSON)')
                    ->rows(3)
                    ->placeholder('{"simulations_completed": 5}')
                    ->helperText('Format JSON untuk kriteria unlock')
                    ->columnSpanFull(),
            ]);
    }
}


