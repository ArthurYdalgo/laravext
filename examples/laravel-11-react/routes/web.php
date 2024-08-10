<?php

use App\Enums\DeveloperRole;
use App\Models\AbuseReport;
use App\Models\Article;
use App\Models\Developer;
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

/**
 * This will automagically generate all the file based routes of your application.
 * It creates a route group that you can send parameters to.
 * 
 * @see https://laravext.dev/#/tools/routing?id=routelaravext for more detailed examples
 */
Route::laravext();

Route::nexus('')->name('home');

// For simplicity reasons, I won't be using a controller for some of these routes
Route::get('{user:username}', function (User $user) {
    $user->loadCount(['articles', 'comments', 'followers', 'following', 'tags']);

    return nexus(props: compact('user'))->render();
})->name('user');

Route::get('{user:username}/{article:slug}', function (User $user, Article $article) {
    if(!$article->user->is($user)) {
        abort(404);
    }

    $article->append(['user_has_bookmarked', 'user_reactions']);
    $article->loadCount('bookmarks', 'comments', 'reactions');
    $article->loadGroupedReactions();

    return nexus(props: compact('article'))
        // ->withViewSkeleton('partials.article')
        ->withHeadTitle($article->title)
        ->render();
})->name('user.article');

// Redirect short links to the article
Route::get('s/{article:short_link_code}', function (Article $article) {
    return redirect()->route('article', ['article' => $article->slug, 'user' => $article->user->username]);
})->name('short-link');

/**
 * You could also make it so that any child route of admin will require the user to be authenticated, and also
 * set a different root view file for the admin route group.
 * 
 * @see https://laravext.dev/#/tools/routing?id=routelaravext for more detailed examples
 * 
 */
// Route::laravext("admin",  route_group_attributes: [
//     'middleware' => ['auth', 'role:admin'],
// ], root_view: 'sections.app');

// Route::get('admin/developers/{developer}/edit', function (Developer $developer) {
//     $developer->load('team');
//     $developer_roles = DeveloperRole::toArray(true);
//     return nexus(props: compact('developer_roles', 'developer'))->render();
// })->middleware(['auth', 'role:admin'])->name('admin.developers.developer.edit');

/**
 * However, because in this project I'm also using other routes that are subroutes of the 'admin' route, I'm going to use the 
 * Route::group() method to wrap the 'admin' route group and keep the middleware on both the Route::laravext(), 
 * and the Route::get() method.
 */
Route::group([
    'middleware' => ['auth', 'role:admin'],
], function () {
    Route::laravext('admin', root_view: 'sections.admin');
});
