<?php

use App\Models\Article;
use App\Models\Read;
use App\Models\User;
use Illuminate\Support\Facades\Route;

/**
 * This will automagically generate all the file based routes of your application.
 * It creates a route group that you can send parameters to.
 * 
 * @see https://laravext.dev/#/tools/routing?id=routelaravext for more detailed examples
 */
Route::laravext();

Route::nexus('')->name('home');

Route::nexus('new')->middleware('auth')->name('new');

// For simplicity reasons, I won't be using a controller for some of these routes
Route::get('{user:username}', function (User $user) {
    $user->loadCount(['articles', 'comments', 'followers', 'following', 'tags']);

    return nexus(props: compact('user'))->render();
})->name('user');


Route::get('{user:username}/{article:slug}', function (User $user, Article $article) {
    if(!$article->user->is($user)) {
        abort(404);
    }

    $share_id = request()->query('sid');

    Read::firstOrCreate([
        'user_id' => auth()?->id(),
        'article_id' => $article->id,
        'share_id' => $share_id,
        'ip_address' => request()->ip(),
    ]);

    $article->append(['user_has_bookmarked', 'user_reactions']);
    $article->loadCount('bookmarks', 'comments', 'reactions');
    $article->loadGroupedReactions();
    $article->load(['tags' => function ($query) {
        $query->select('slug')->orderBy('slug');
    }]);

    $latest_articles_from_user = $user->articles()->with(['tags', 'user'])
    ->where("id", "!=", $article->id)
    ->latest('published_at')
    ->available()
    ->limit(5)->get();

    return nexus(props: compact('article', 'latest_articles_from_user'))
        ->withViewSkeleton('partials.article')
        ->withHeadTitle($article->title)
        ->render();
})->name('user.article');

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
