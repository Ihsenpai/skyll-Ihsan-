<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('user_simulations', function (Blueprint $table) {
            $table->string('grade')->nullable()->after('completion_percentage');
            $table->integer('xp_earned')->default(0)->after('grade');
        });
    }

    public function down(): void
    {
        Schema::table('user_simulations', function (Blueprint $table) {
            $table->dropColumn(['grade', 'xp_earned']);
        });
    }
};
