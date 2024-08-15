<?php

use App\Enums\DeveloperRole;
use App\Models\AbuseReport;
use App\Models\Article;
use App\Models\Developer;
use App\Models\Reaction;
use App\Models\Read;
use App\Models\Share;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

/**
 * Nothing stops you from creating your own custom routes, like this one.
 * 
 * @see https://laravel.com/docs/11.x/routing#view-routes for more details
 */
Route::view('about-this-project', 'sections.about-this-project')->name('about-this-project');

// Redirect article short link codes to the article
Route::get('sl/{article:short_link_code}', function (Article $article) {
    return redirect()->route('user.article', ['article' => $article->slug, 'user' => $article->user->username]);
})->name('article.short-link');

// Redirect share links to the article
Route::get('s/{share:code}', function (Share $share) {
    return redirect()->route('user.article', ['article' => $share->article->slug, 'user' => $share->article->user->username, 'sid' => $share->id]);
})->name('share');

require __DIR__ . '/laravext.php';