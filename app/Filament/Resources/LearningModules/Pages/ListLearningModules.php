<?php

namespace App\Filament\Resources\LearningModules\Pages;

use App\Filament\Resources\LearningModules\LearningModuleResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListLearningModules extends ListRecords
{
    protected static string $resource = LearningModuleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
