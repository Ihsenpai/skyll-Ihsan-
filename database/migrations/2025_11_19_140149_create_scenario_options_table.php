<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('scenario_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scenario_id')->constrained()->onDelete('cascade');
            $table->string('option_text');
            $table->text('explanation')->nullable(); // Penjelasan kenapa pilihan ini benar/salah
            $table->integer('score_impact'); // Poin yang didapat dari pilihan ini
            $table->json('skill_weights')->nullable(); // Bobot untuk skill tertentu
            $table->boolean('is_best_choice')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scenario_options');
    }
};
