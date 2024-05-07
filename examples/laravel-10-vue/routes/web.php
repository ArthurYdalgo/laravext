<?php

use App\Models\Book;
use Illuminate\Support\Facades\Route;
use Laravext\Laravext;

Route::redirect('/', 'books');

Route::get("/login-as/{user}", function ($user) {
    auth()->loginUsingId($user);
    return redirect()->to('');
});

/**
 * This will automagically generate all the file based routes of your application.
 * It creates a route group that you can send parameters/props to.
 * 
 * @see https://laravext.dev/docs/1.x/routing#route-methods-laravext for more detailed examples
 */
Route::laravext();

Route::view('/', 'sections.home')->name('home');

Route::nexus('contact-us', '(global)/(guest)/contact-us/page.vue', root_view: 'sections.contact-us')->name('contact-us');
Route::laravext("admin",  route_group_attributes: [
    'middleware' => 'auth',
], root_view: 'sections.app');
