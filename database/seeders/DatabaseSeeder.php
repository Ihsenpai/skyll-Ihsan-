<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Jalankan seeder untuk professions terlebih dahulu
        $this->call([
            ProfessionSeeder::class,
            AdminUserSeeder::class,
        ]);

        // User\Seeder::factory(10)->create();

        // Jika ingin create test user juga
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}