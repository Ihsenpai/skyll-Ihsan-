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
        Schema::create('user_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_simulation_id')->constrained()->onDelete('cascade');
            $table->foreignId('scenario_id')->constrained()->onDelete('cascade');
            $table->foreignId('scenario_option_id')->constrained()->onDelete('cascade');
            $table->integer('score_earned');
            $table->integer('time_taken_seconds')->nullable(); // Waktu yang dihabiskan
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_answers');
    }
};
