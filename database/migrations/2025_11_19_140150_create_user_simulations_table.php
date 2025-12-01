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
        Schema::create('user_simulations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade'); // Nullable untuk guest
            $table->foreignId('profession_id')->constrained()->onDelete('cascade');
            $table->string('session_id')->nullable(); // Untuk tracking guest sessions
            $table->integer('total_score')->default(0);
            $table->integer('max_possible_score')->default(0);
            $table->decimal('completion_percentage', 5, 2)->default(0);
            $table->json('skill_breakdown')->nullable(); // Breakdown score per skill
            $table->json('result_summary')->nullable(); // JSON hasil simulasi lengkap
            $table->text('ai_feedback')->nullable(); // Feedback dari Hugging Face AI
            $table->enum('status', ['in_progress', 'completed', 'abandoned'])->default('in_progress');
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_simulations');
    }
};
