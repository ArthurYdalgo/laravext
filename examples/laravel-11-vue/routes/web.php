<?php

use App\Enums\DeveloperRole;
use App\Mail\ContactRequestReply;
use App\Models\ContactRequest;
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

Route::redirect('', 'about-this-project')->name('home');

/**
 * Nothing stops you from creating your own custom routes, like this one.
 * 
 * @see https://laravel.com/docs/11.x/routing#view-routes for more details
 */
Route::view('about-this-project', 'sections.about-this-project')->name('about-this-project');

/**
 * Let's say that you need this route to use this specific view file for SEO reason, because it contains contact information,
 * so you can set the root_view parameter to the view file you want to use. You could set a different 
 * page file, but by default it'll use any file it has already found for that route.
 * 
 * @see https://laravext.dev/#/tools/routing?id=routenexus for more detailed examples
 */
Route::nexus('contact-us', root_view: 'sections.contact-us')->name('contact-us');

/**
 * You can also server-side fetch data and pass it to the client side.
 * 
 * @see https://laravext.dev/#/tools/nexus-response?id=no-need-to-repeat-yourself
 * @see https://laravext.dev/#/examples/page?id=page-with-server-side-fetching
 */
Route::get('our-teams', function () {
    $teams = Team::all();

    return nexus(props: compact('teams'))->render();
})->name('our-teams');

/**
 * You could also make it so that any child route of admin will require the user to be authenticated, and also
 * set a different root view file for the admin route group.
 * 
 * @see https://laravext.dev/#/tools/routing?id=routelaravext for more detailed examples
 * 
 */
// Route::laravext("admin",  route_group_attributes: [
//     'middleware' => 'auth',
// ], root_view: 'sections.app');

// Route::get('admin/developers/{developer}/edit', function (Developer $developer) {
//     $developer->load('team');
//     $developer_roles = DeveloperRole::toArray(true);
//     return nexus(props: compact('developer_roles', 'developer'))->render();
// })->middleware('auth')->name('admin.developers.developer.edit');

/**
 * However, because in this project I'm also using other routes that are subroutes of the 'admin' route, I'm going to use the 
 * Route::group() method to wrap the 'admin' route group and keep the middleware on both the Route::laravext(), 
 * and the Route::get() method.
 */
Route::group([
    'middleware' => 'auth',
], function () {
    Route::laravext('admin', root_view: 'sections.app');

    Route::get('admin/developers/create', fn() => nexus(props: [
        'developer_roles' => DeveloperRole::toArray(true),
    ])->render())->name('admin.developers.create');
    
    Route::get('admin/developers/{developer}/edit', function (Developer $developer) {
        $developer->load('team');

        $developer_roles = DeveloperRole::toArray(true);

        return nexus(props: compact('developer_roles', 'developer'))->render();
    })->name('admin.developers.developer.edit');


});
