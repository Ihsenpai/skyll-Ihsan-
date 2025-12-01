<?php

namespace App\Filament\Resources\LearningModules\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use App\Models\Profession;

class LearningModuleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('profession_id')
                    ->label('Profesi')
                    ->options(Profession::pluck('name', 'id'))
                    ->required()
                    ->searchable(),

                TextInput::make('title')
                    ->label('Judul Materi')
                    ->required()
                    ->maxLength(255),

                Textarea::make('description')
                    ->label('Deskripsi')
                    ->rows(3)
                    ->columnSpanFull(),

                FileUpload::make('pdf_file')
                    ->label('File PDF')
                    ->acceptedFileTypes(['application/pdf'])
                    ->maxSize(10240) // 10MB
                    ->directory('learning-modules')
                    ->required()
                    ->downloadable()
                    ->openable()
                    ->columnSpanFull(),

                TextInput::make('duration_minutes')
                    ->label('Estimasi Waktu Baca (Menit)')
                    ->numeric()
                    ->minValue(1),

                TextInput::make('order')
                    ->label('Urutan')
                    ->numeric()
                    ->default(0)
                    ->required(),

                Toggle::make('is_active')
                    ->label('Aktif')
                    ->default(true)
                    ->inline(false),
            ]);
    }
}
