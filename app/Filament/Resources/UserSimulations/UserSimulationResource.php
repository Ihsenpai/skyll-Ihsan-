<?php

namespace App\Filament\Resources\UserSimulations;

use App\Filament\Resources\UserSimulations\Pages\CreateUserSimulation;
use App\Filament\Resources\UserSimulations\Pages\EditUserSimulation;
use App\Filament\Resources\UserSimulations\Pages\ListUserSimulations;
use App\Filament\Resources\UserSimulations\Schemas\UserSimulationForm;
use App\Filament\Resources\UserSimulations\Tables\UserSimulationsTable;
use App\Models\UserSimulation;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class UserSimulationResource extends Resource
{
    protected static ?string $model = UserSimulation::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedPlayCircle;

    protected static ?string $navigationLabel = 'Simulasi';
    
    protected static ?string $recordTitleAttribute = 'id';

    public static function form(Schema $schema): Schema
    {
        return UserSimulationForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return UserSimulationsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListUserSimulations::route('/'),
            'create' => CreateUserSimulation::route('/create'),
            'edit' => EditUserSimulation::route('/{record}/edit'),
        ];
    }
}
