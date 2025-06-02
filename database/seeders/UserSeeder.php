<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        $adminRole = Role::where('name', 'admin')->first();
        $userRole = Role::where('name', 'user')->first();

        // Create an admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('qwerty@123'),
            'role_id' => $adminRole->id
        ]);

        // Create a regular user
        User::Create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => Hash::make('qwerty123'),
            'role_id' => $userRole->id
        ]);
    }
}
