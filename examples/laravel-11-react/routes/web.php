<?php

use App\Enums\DeveloperRole;
use App\Models\Article;
use App\Models\Developer;
use App\Models\Team;
use Illuminate\Support\Facades\Route;

/**
 * This will automagically generate all the file based routes of your application.
 * It creates a route group that you can send parameters to.
 * 
 * @see https://laravext.dev/#/tools/routing?id=routelaravext for more detailed examples
 */
Route::laravext();

/**
 * Nothing stops you from creating your own custom routes, like this one.
 * 
 * @see https://laravel.com/docs/11.x/routing#view-routes for more details
 */
Route::view('/', 'sections.home')->name('home');

Route::get('{article:slug}', function (Article $article) {
    return view('sections.article', compact('article'));
})->name('article');