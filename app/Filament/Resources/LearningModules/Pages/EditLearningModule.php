<?php

namespace App\Filament\Resources\LearningModules\Pages;

use App\Filament\Resources\LearningModules\LearningModuleResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditLearningModule extends EditRecord
{
    protected static string $resource = LearningModuleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
