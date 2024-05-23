<?php

use App\Models\Book;
use Illuminate\Support\Facades\Route;
use Laravext\Laravext;

Route::redirect('/', 'books');

Route::get("/login-as/{user}", function($user){
    auth()->loginUsingId($user);
    return redirect()->to('');
});


/**
 * This will automagically generate all the file based routes of your application.
 * It creates a route group that you can send parameters/props to.
 * 
 * @see https://laravext.dev/#/tools/routing for more detailed examples
 */
Route::laravext();

/**
 * The example below shows how you can use laravext in a traditional way, server-side fetching any data, and then
 * rendering a nexus (or a view) with the fetched data. This is useful for SEO purposes, as the data will be
 * available in the HTML response.
 */
// Route::get('books/{slug}', function($slug){
//     // $book = Book::where('slug', $slug)->with('author')->firstOrFail();
//     $books = Book::with('author')->get();
//     $book = $books->random();

//     // Using the Laravext facade, or nexus helper function, you can render a view with the defined props
//     // return Laravext::nexus(props: compact('book'))->rootView('books.display')->render();
//     return nexus(props: compact('book'))->rootView('books.display')->render();

//     // Althogh you may consider this quite verbose, because it could simply be done like the example below, calling a view directly.
//     // But remember to use the $book variable in the view, as the $laravext variable will not be available
//     // return view('books.display', compact('book')); 

//     // You could also define a component that will be used as nexus, with the book as a prop, and this makes
//     // the book details be client-side rendered, although the book was already fetched server-side.
//     // ...
//     // Although I couldn't find a good use case for this, it's an example of how you can use the nexus blade directive
//     // to do some additional reactive stuff along with strands, and with the server-side rendered data for SEO purposes.
//     // return nexus('page.jsx', compact('book'))->render();

// })->name('books.slug');

// /**
//  * Any automagically generate route from this point forward (including the '/dashboard' route itself)
//  * will contain the defined props, and the defined route group attributes, such as middleware
//  * and name prefix, but the prefix will be ignored, unlike a common route group.
//  */
// Route::laravext('dashboard', [
//     'inspiring_quote' => 'You are the creator of your own destiny.',
// ], route_group_attributes: [
//     // 'prefix' => 'dashboard', // the prefix key is unset internally, to avoid conflicts with the laravext router
//     'middleware' => [
//         // 'auth',
//         // 'verified'
//     ],

//     'as' => 'admin.'
// ]);

// /**
//  * You may also use the nexus() route method to define a route with the defined props and route attributes, such as middlewares
//  * 
//  * These routes' properties, such as which component will be rendered, route conventions, route name, etc, will be retained
//  * from previously automagically generated routes.
//  * 
//  * @see https://laravext.dev/#/tools/routing for more detailed examples
//  */
// Route::nexus('dashboard/settings')->middleware([
//     // 'auth'
// ])->withoutMiddleware([
//     // 'exampleMiddlewareToBeRemoved'
// ]);

/**
 * You can also define a custom component to be rendered in the nexus route. This will override the default component created
 * by the laravext router. This will only override the component. Route conventions, route names, etc will be retained...
 */
// Route::nexus('dashboard/settings', '(app)/dashboard/page.jsx')->middleware([
//     // 'auth'
// ])->withoutMiddleware([
//     // 'exampleMiddlewareToBeRemoved'
// ])->name('admin.dashboard.settings');

// Route::nexus('dashboard/settings', layout: '(app)/layout.jsx')->middleware([
//     // 'auth'
// ])->withoutMiddleware([
//     // 'exampleMiddlewareToBeRemoved'
// ])->name('admin.dashboard.settings');

/**
 * Unless you set the merge_with_existing_route to false, which will use a clean slate to define the route, and will not
 * retain any previously defined route properties, such as the component, route name, conventions, etc.
 * In this case, you need to define the component location.
 */
// Route::nexus('dashboard/settings', '(app)/dashboard/page.jsx', merge_with_existing_route: false)->middleware([
//     // 'auth'
// ])->withoutMiddleware([
//     // 'exampleMiddlewareToBeRemoved'
// ])->name('admin.dashboard.settings');
