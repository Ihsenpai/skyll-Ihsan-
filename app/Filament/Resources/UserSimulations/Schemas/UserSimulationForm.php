<?php

namespace App\Filament\Resources\UserSimulations\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class UserSimulationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->relationship('user', 'name'),
                Select::make('profession_id')
                    ->relationship('profession', 'name')
                    ->required(),
                TextInput::make('session_id'),
                TextInput::make('total_score')
                    ->required()
                    ->numeric()
                    ->default(0),
                TextInput::make('max_possible_score')
                    ->required()
                    ->numeric()
                    ->default(0),
                TextInput::make('completion_percentage')
                    ->required()
                    ->numeric()
                    ->default(0),
                TextInput::make('skill_breakdown'),
                TextInput::make('result_summary'),
                Textarea::make('ai_feedback')
                    ->columnSpanFull(),
                TextInput::make('status')
                    ->required()
                    ->default('in_progress'),
                DateTimePicker::make('completed_at'),
                TextInput::make('grade'),
                TextInput::make('xp_earned')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }
}
