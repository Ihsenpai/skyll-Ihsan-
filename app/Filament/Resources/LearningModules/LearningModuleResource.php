<?php

namespace App\Filament\Resources\LearningModules;

use App\Filament\Resources\LearningModules\Pages\CreateLearningModule;
use App\Filament\Resources\LearningModules\Pages\EditLearningModule;
use App\Filament\Resources\LearningModules\Pages\ListLearningModules;
use App\Filament\Resources\LearningModules\Schemas\LearningModuleForm;
use App\Filament\Resources\LearningModules\Tables\LearningModulesTable;
use App\Models\LearningModule;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class LearningModuleResource extends Resource
{
    protected static ?string $model = LearningModule::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-book-open';

    protected static ?string $recordTitleAttribute = 'title';

    protected static ?string $navigationLabel = 'Materi Pembelajaran';

    protected static ?string $modelLabel = 'Materi Pembelajaran';

    protected static ?string $pluralModelLabel = 'Materi Pembelajaran';

    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return LearningModuleForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return LearningModulesTable::configure($table);
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
            'index' => ListLearningModules::route('/'),
            'create' => CreateLearningModule::route('/create'),
            'edit' => EditLearningModule::route('/{record}/edit'),
        ];
    }
}
