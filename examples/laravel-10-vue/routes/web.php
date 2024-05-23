<?php

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

/**
 * Let's say that you need this route to use this specific view file for SEO reason, because it contains contact information,
 * so you can set the root_view parameter to the view file you want to use. You could set a different 
 * page file, but by default it'll use any file it has already found for that route.
 * 
 * @see https://laravext.dev/#/tools/routing?id=routenexus for more detailed examples
 */
Route::nexus('contact-us', root_view: 'sections.contact-us')->name('contact-us');

/**
 * You can also make it so that any child route of admin will require the user to be authenticated, and also
 * set a different root view file for the admin route group.
 * 
 * @see https://laravext.dev/#/tools/routing?id=routelaravext for more detailed examples
 */
Route::laravext("admin",  route_group_attributes: [
    'middleware' => 'auth',
], root_view: 'sections.app');

Route::get('admin/teams/{team}', function($team) {
    return nexus(props: [
        'team' => Team::find($team)
    ])->render();
})->name('admin.teams.team');
