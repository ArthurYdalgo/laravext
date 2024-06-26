<?php

use App\Enums\DeveloperRole;
use App\Models\Article;
use App\Models\Developer;
use App\Models\Team;
use Illuminate\Http\Resources\Json\JsonResource;
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

Route::get('', function () {
    $articles = Article::latest()->paginate(10);

    $server_skeleton = view('partials.articles', compact('articles'))->render();

    return nexus(
    //     props: [
    //     'articles' => [
    //         'data' => JsonResource::collection($articles),
    //         'links' => $articles->links(),
    //         'meta' => [
    //             'current_page' => $articles->currentPage(),
    //             'from' => $articles->firstItem(),
    //             'last_page' => $articles->lastPage(),
    //             'path' => $articles->path(),
    //             'per_page' => $articles->perPage(),
    //             'to' => $articles->lastItem(),
    //             'total' => $articles->total()
    //         ],
    //     ]

    // ]
    )
    // ->withHtmlSkeleton($server_skeleton)
    ->render();
})->name('home');

Route::get('{article:slug}', function (Article $article) {

    $article->append(['user_has_bookmarked', 'user_reactions']);

    return nexus(props: compact('article'))
        ->withViewSkeleton('partials.article')
        ->withHeadTitle($article->title)
        ->render();

})->name('article');

// Redirect short links to the article
Route::get('s/{article:short_link_code}', function (Article $article) {
    return redirect()->route('article', ['article' => $article->slug]);
})->name('short-link');

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
    Route::laravext('admin', root_view: 'sections.editor');
});
