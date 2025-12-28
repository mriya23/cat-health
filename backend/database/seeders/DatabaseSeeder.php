<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin',
            'email' => 'admin@cathealth.ai',
            'password' => Hash::make('password'),
            'plan' => 'clinic',
            'email_verified_at' => now(),
        ]);

        // Create demo user
        User::create([
            'name' => 'Demo User',
            'email' => 'demo@cathealth.ai',
            'password' => Hash::make('password'),
            'plan' => 'pro',
            'email_verified_at' => now(),
        ]);
    }
}
