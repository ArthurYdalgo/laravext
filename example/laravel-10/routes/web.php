<?php

use App\Models\Book;
use Illuminate\Support\Facades\Route;
use Laravext\Laravext;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

/**
 * This will automagically generate all the file based routes of your application.
 * It creates a route group that you can send parameters/props to.
 * 
 * @see https://laravext.dev/docs/1.x/routing#route-methods-laravext
 */
Route::laravext();

Route::get('books/{slug}', function($slug){
    $book = Book::where('slug', $slug)->firstOrFail();
    

    // Using the Laravext facade
    // return Laravext::nexus(props: compact('book'))->rootView('books.display')->render();

    // Using the nexus() helper
    return nexus(props: compact('book'))->rootView('books.display')->render();

    // Althogh you may consider this quite verbose, because it could simply be done like the example below
    // But remember to use the $book variable in the view, as the $laravext variable will not be available
    // return view('books.display', compact('book')); 
})->name('books.display');

/**
 * Any automagically generate route from this point forward (including the '/dashboard' route itself)
 * will contain the defined props, and the defined route group attributes, such as middleware
 * and name prefix, but the prefix will be ignored, unlike a common route group.
 */
Route::laravext('dashboard', [
    'inspiring_quote' => 'You are the creator of your own destiny.',
], route_group_attributes: [
    // 'prefix' => 'dashboard', // the prefix key is unset internally, to avoid conflicts with the router
    'middleware' => [
        'auth',
        'verified'
    ],
    
    'as' => 'admin.'
]);

/**
 * You may also use the nexus() route method to define a route with the defined props and route attributes, such as middlewares
 * 
 * This will override any automagically generated route previously defined to the same uri.
 * These kind of routes are not automagically named
 * 
 * @see https://laravext.dev/docs/1.x/routing#route-methods-nexus
 */
Route::nexus('dashboard/settings')->middleware(['auth'])->withoutMiddleware([
    // 'exampleMiddlewareToBeRemoved'
])->name('admin.dashboard.settings');