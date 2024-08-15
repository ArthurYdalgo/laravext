<?php

use Illuminate\Support\Facades\Route;

Route::redirect('', 'about-this-project')->name('home');

/**
 * Nothing stops you from creating your own custom routes, like this one.
 * 
 * @see https://laravel.com/docs/11.x/routing#view-routes for more details
 */
Route::view('about-this-project', 'sections.about-this-project')->name('about-this-project');

require __DIR__.'/laravext.php';
