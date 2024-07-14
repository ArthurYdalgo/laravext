<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\AbuseReport;
use App\Models\Article;
use App\Models\Comment;
use App\Models\Reaction;
use App\Models\Share;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Lottery;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin_role = Role::findOrCreate('admin');

        // Create a default user, if not exists
        $default_email = 'developer@email.com';

        if (User::where('email', $default_email)->doesntExist()) {
            $developer = User::factory()->create([
                'name' => 'Developer',
                'email' => $default_email,
                'username' => 'the-developer',
            ]);

            $developer->assignRole($admin_role);
        }

        $this->call([
            TagSeeder::class,
            ArticlesSeeder::class,
        ]);

        
        line("Seeding completed!");
    }
}
