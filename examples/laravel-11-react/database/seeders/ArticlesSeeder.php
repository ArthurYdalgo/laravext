<?php

namespace Database\Seeders;


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

class ArticlesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $write_role = Role::findOrCreate('writer');

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

        $initial_readers_count = 500;
        line("Creating {$initial_readers_count} readers...");
        $readers = User::factory($initial_readers_count)->create();
        $tags = Tag::all();
        $tags_count = $tags->count();

        if($tags->isNotEmpty()){
            foreach($readers as $reader){
                $reader->tags()->sync($tags->random(min($tags_count, random_int(3, 10))));
            }
        }

        $initial_writes_count = 20;
        line("Creating {$initial_writes_count} writers and their articles...");
        $writers = User::factory($initial_writes_count)->create();

        foreach ($writers as $writer) {
            $writer->assignRole($write_role);

            $writer->update([
                'username' => str($writer->name)->slug()->toString(),
            ]);

            for ($articles_count = 0; $articles_count < random_int(3, 5); $articles_count++) {
                $title = fake()->sentence();

                // $banner = $writer->addMediaFromContent(generateTextedImage($title, 1000, 480, fake()->randomElement($light_colors), font_size: 45), path_suffix: 'articles');

                $content = "";

                $media_to_attach = [];

                for ($paragraphs_count = 0; $paragraphs_count < random_int(3, 5); $paragraphs_count++) {
                    $sentence = fake()->sentence(4);

                    // $media = $writer->addMediaFromContent(generateTextedImage($sentence, 1080, 720, fake()->randomElement($light_colors), font_size: 35), path_suffix: 'articles');

                    // $media_to_attach[] = $media->id;

                    $code = fake()->randomElement([
                        "```php\n<?php\n\n echo \"Hello, World!\";\n```",
                    ]);
                    
                    $paragraph = fake()->sentence(250) . "\n\nExample Code:\n{$code}\n\n\n";
                    
                    $header = fake()->sentence(5);

                    $content .= "## {$header}\n\n{$paragraph}\n\n";
                }

                $article = Article::factory()->create([
                    'user_id' => $writer->id,
                    'slug' => str($title)->slug()->append(str()->random(5))->toString(),
                    'title' => $title,
                    'short_link_code' => str()->random(16),
                    'content' => $content,
                    // 'banner_url' => $banner->url,
                    'metadata' => [
                        'display_banner_in_listing' => fake()->boolean(),
                    ]
                ]);

                $article->media()->attach($media_to_attach);

                $article->tags()->attach(Tag::all()->random(5));
            }
        }

        $articles = Article::all();

        $random_articles = $articles->random(min($articles->count(), random_int(10, $articles->count())));

        line("Seeding Interactions...");
        foreach ($random_articles as $random_article) {
            for ($interactions_count = 0; $interactions_count < random_int(5, 10); $interactions_count++) {
                $reader = $readers->random();

                // follow
                if (Lottery::odds(1, 3)->choose()) {
                    $reader->follow($random_article->user);

                    // unfollow
                    if (Lottery::odds(1, 15)->choose()) {
                        $reader->unfollow($random_article->user);
                    }
                }

                // booksmarks
                if (Lottery::odds(3, 10)->choose()) {
                    $reader->bookmark($random_article);
                }

                // reactions
                if (Lottery::odds(8, 10)->choose()) {
                    $reaction = fake()->randomElement(Reaction::$available_reactions);

                    $reader->reactTo($random_article, $reaction);
                }

                // comments
                if (Lottery::odds(1, 2)->choose()) {
                    Comment::factory()->create([
                        'user_id' => $reader->id,
                        'article_id' => $random_article->id,
                    ]);
                }

                // shares
                $share = null;
                if (Lottery::odds(3, 10)->choose()) {
                    $share = $random_article->shares()->create([
                        'user_id' => $random_article->user->id,
                        'medium' => fake()->randomElement(Share::$available_mediums),
                        'code' => str()->random(16),
                        'ip_address' => fake()->ipv4,
                    ]);
                }

                // reads
                $random_article->reads()->create([
                    'user_id' => $reader->id,
                    'share_id' => $share?->id,
                    'ip_address' => fake()->ipv4,
                ]);
            }
        }

        $random_articles = $articles->random(min($articles->count(), random_int(10, $articles->count())));

        $comments = Comment::all();

        $random_comments = $comments->random(min($comments->count(), random_int(5, intval($comments->count() / 2))));

        line("Seeding Replies, Reactions and Abuse Reports on Comments...");
        foreach ($random_comments as $random_comment) {
            $reader = $readers->random();

            // Reaction
            if (Lottery::odds(1, 2)->choose()) {
                $reaction = fake()->randomElement(Reaction::$available_reactions);

                $reader->reactTo($random_comment, $reaction);
            }

            // Abuse report
            if (Lottery::odds(1, 30)->choose()) {
                $abuse_report = AbuseReport::factory()->create([
                    'user_id' => $reader->id,
                    'reportable_id' => $random_comment->id,
                    'reportable_type' => Comment::class,
                ]);

                if (Lottery::odds(1, 5)->choose()) {
                    $abuse_report->update([
                        'reply' => fake()->sentence,
                        'replied_at' => now(),
                    ]);
                }
            }

            // Reply
            if (Lottery::odds(1, 2)->choose()) {
                Comment::factory()->create([
                    'user_id' => $reader->id,
                    'article_id' => $random_comment->article_id,
                    'comment_id' => $random_comment->id,
                ]);
            }
        }

        $random_writers = $writers->random(min($writers->count(), random_int(5, intval($writers->count() / 2))));

        line("Seeding Abuse Reports on Writers...");
        foreach ($random_writers as $random_writer) {
            $reader = $readers->random();

            // abuse report
            if (Lottery::odds(1, 50)->choose()) {
                $abuse_report = AbuseReport::factory()->create([
                    'user_id' => $reader->id,
                    'reportable_id' => $random_writer->id,
                    'reportable_type' => User::class,
                ]);

                if (Lottery::odds(1, 5)->choose()) {
                    $abuse_report->update([
                        'reply' => fake()->sentence,
                        'replied_at' => now(),
                    ]);
                }
            }
        }
    }
}
