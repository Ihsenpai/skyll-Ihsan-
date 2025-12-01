<?php

namespace App\Filament\Resources\UserSimulations\Pages;

use App\Filament\Resources\UserSimulations\UserSimulationResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListUserSimulations extends ListRecords
{
    protected static string $resource = UserSimulationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
