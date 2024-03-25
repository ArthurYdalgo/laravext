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
 * @see https://laravext.dev/docs/1.x/routing#route-methods-laravext for more detailed examples
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