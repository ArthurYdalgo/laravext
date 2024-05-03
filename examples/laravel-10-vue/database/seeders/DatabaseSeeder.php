<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Author;
use App\Models\Company;
use App\Models\Developer;
use App\Models\Project;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'email' => 'default@email.com'
        ]);
        
        $users = User::factory(20)->create();

        Company::factory(20)->hasProjects(10)->create();

        $projects = Project::all();

        $teams = Team::factory(10)->create();

        foreach ($teams as $team) {
            Developer::factory()->create([
                'team_id' => $team->id,
                'role' => 'backend'
            ]);

            Developer::factory()->create([
                'team_id' => $team->id,
                'role' => 'frontend'
            ]);

            Developer::factory()->create([
                'team_id' => $team->id,
                'role' => 'designer'
            ]);

            Developer::factory()->create([
                'team_id' => $team->id,
                'role' => 'qa'
            ]);

            Developer::factory()->create([
                'team_id' => $team->id,
                'role' => 'fullstack'
            ]);

            Developer::factory()->create([
                'team_id' => $team->id,
                'role' => 'devops'
            ]);
        }       
        
        foreach ($projects as $project) {
            $project->update(['team_id' => $teams->random()->id]);

            foreach($users->random(random_int(10,20)) as $user) {
                $user->comments()->create([
                    'content' => fake()->text(random_int(200,500)),
                    'project_id' => $project->id
                ]);
            }

            $user->comments()->create([
                'content' => fake()->text(random_int(200,500)),
                'project_id' => $project->id,
                'deleted_at' => now()
            ]);
        }


    }
}
