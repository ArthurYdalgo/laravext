<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Article;
use App\Models\Comment;
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
        $write_role = Role::findOrCreate('writer');

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
        ]);

        $light_colors = [
            [255, 255, 255],
            [211, 211, 211],
            [173, 216, 230],
            [144, 238, 144],
            [255, 255, 224],
            [255, 182, 193],
            [230, 230, 250],
            [255, 228, 196],
            [255, 192, 203],
        ];

        $initial_readers_count = 20;
        line("Creating {$initial_readers_count} readers...");
        $readers = User::factory($initial_readers_count)->create();
        
        $initial_writes_count = 5;
        line("Creating {$initial_writes_count} writers and their articles...");
        $writers = User::factory($initial_writes_count)->create();

        foreach ($writers as $writer) {
            $writer->assignRole($write_role);

            $writer->update([
                'username' => str($writer->name)->slug()->toString(),
            ]);
 
            for ($articles_count = 0; $articles_count < random_int(3, 5); $articles_count++){
                $title = fake()->sentence();
    
                $banner = $writer->addMediaFromContent(generateTextedImage($title, 1000, 480, fake()->randomElement($light_colors), font_size: 45));
    
                $content = "";

                $media_to_attach = [];
                
                for($paragraphs_count = 0; $paragraphs_count < random_int(3, 5); $paragraphs_count++){
                    $sentence = fake()->sentence();
    
                    $media = $writer->addMediaFromContent(generateTextedImage($sentence, 1080, 720, fake()->randomElement($light_colors), font_size: 20));

                    $media_to_attach[] = $media->id;
    
                    $paragraph = fake()->sentence(250) . "\n\n" . "![image]($media->url)" . "\n\n";
    
                    $content .= $paragraph;
                }
    
                $article = Article::factory()->create([
                    'user_id' => $writer->id,
                    'slug' => str($title)->slug()->append(str()->random(5))->toString(),
                    'title' => $title,
                    'content' => $content,
                    'banner_url' => $banner->url,
                ]);

                $article->media()->attach($media_to_attach);
    
                $article->tags()->attach(Tag::all()->random(5));
            }
        }

        $articles = Article::all();

        $random_articles = $articles->random(min($articles->count(), random_int(10, $articles->count())));

        foreach($random_articles as $random_article){
            $reader = $readers->random();

            // follow

            // booksmarks

            // reactions

            // comments

            // comments replies

            // views

            // shares
        }

        $random_articles = $articles->random(min($articles->count(), random_int(10, $articles->count())));

        $comments = Comment::all();

        $random_comments = $comments->random(min($comments->count(), random_int(2, 5)));

        foreach($random_comments as $random_comment){
            $reader = $readers->random();

            // abuse report
        }

        $random_writers = $writers->random(min($writers->count(), random_int(2, 5)));

        foreach($random_writers as $random_writer){
            $reader = $readers->random();

            // abuse report
        }

        line("Seeding completed!");
    }
}
