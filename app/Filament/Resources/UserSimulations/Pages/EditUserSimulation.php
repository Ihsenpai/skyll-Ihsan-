<?php

namespace App\Filament\Resources\UserSimulations\Pages;

use App\Filament\Resources\UserSimulations\UserSimulationResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditUserSimulation extends EditRecord
{
    protected static string $resource = UserSimulationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
