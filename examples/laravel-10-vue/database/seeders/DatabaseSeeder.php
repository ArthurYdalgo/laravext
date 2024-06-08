<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Author;
use App\Models\Company;
use App\Models\ContactRequest;
use App\Models\Developer;
use App\Models\Project;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Lottery;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a default user, if not exists
        $default_email = 'developer@email.com';

        if(User::where('email', $default_email)->doesntExist()){
            User::factory()->create([
                'name' => 'Developer',
                'email' => $default_email
            ]);
        }
        
        $users = User::factory(20)->create();

        Company::factory(10)->hasProjects(3)->create();

        $projects = Project::whereNull('team_id')->get();

        if(Team::where("name", "Mamonas Assassinas 🇧🇷")->doesntExist()){
            Team::factory()->create([
                /**
                * In memory of one of the best brazilian 🇧🇷 rock bands
                * 
                * @see https://en.wikipedia.org/wiki/Mamonas_Assassinas
                */
                'name' => 'Mamonas Assassinas 🇧🇷'
            ]);
        }

        Team::factory(20)->create();

        $teams = Team::doesntHave('developers')->get();

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

        $contact_requests = ContactRequest::factory(20)->create();

        foreach ($contact_requests as $contact_request) {
            if(Lottery::odds(0.7)->choose()){
                $contact_request->update([
                    'replier_id' => $users->random()->id,
                    'reply' => fake()->text(random_int(200,500)),
                    'replied_at' => now()
                ]);
            }
        }
    }
}
