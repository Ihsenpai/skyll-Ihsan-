<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Super Admin
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@skyll.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'role' => 'admin', // Sesuaikan dengan kolom role di migration
        ]);

        // Create Demo User
        User::create([
            'name' => 'Demo User',
            'email' => 'demo@skyll.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);

        // Create Test Users
        User::factory(5)->create([
            'role' => 'user'
        ]);
    }
}