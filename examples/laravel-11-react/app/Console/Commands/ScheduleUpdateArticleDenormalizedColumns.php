<?php

namespace App\Console\Commands;

use App\Models\Article;
use Illuminate\Console\Command;

class ScheduleUpdateArticleDenormalizedColumns extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:schedule-update-article-denormalized-columns';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $articles = Article::select('id')->available()->get();

        foreach($articles as $article){
            $article_id = $article->id;

            dispatch(function()use($article_id){
                $article = Article::find($article_id);

                $article->updateDenormalizedColumns();
            });
        }
    }
}
