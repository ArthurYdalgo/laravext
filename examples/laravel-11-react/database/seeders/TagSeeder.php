<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $slugs = [
            'webdev',
            'laravel',
            'php',
            'javascript',
            'vuejs',
            'reactjs',
            'angular',
            'nodejs',
            'expressjs',
            'mongodb',
            'mysql',
            'programming',
            'coding',
            'ai',
            'devops',
            'api',
            'backend',
            'frontend',
            'fullstack',
            'news',
        ];

        foreach($slugs as $slug){
            Tag::firstOrCreate(compact('slug'));
        }
    }
}
