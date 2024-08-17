<?php

use App\Models\Article;
use App\Models\Share;
use Illuminate\Support\Facades\Route;

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