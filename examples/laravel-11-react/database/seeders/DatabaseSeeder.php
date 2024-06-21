<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

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
        $write_role = Role::findOrCreate('writer');

        // Create a default user, if not exists
        $default_email = 'developer@email.com';

        if(User::where('email', $default_email)->doesntExist()){
            $developer = User::factory()->create([
                'name' => 'Developer',
                'email' => $default_email
            ]);

            $developer->assignRole($admin_role);
        }
        
        $writers = User::factory(10)->create();

        foreach($writers as $writer){
            $writer->assignRole($write_role);
        }

        $readers = User::factory(20)->create();

    }
}
