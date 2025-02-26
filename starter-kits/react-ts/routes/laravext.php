<?php 

use Illuminate\Support\Facades\Route;

Route::laravext();

/**
 * This is done to give a proper name to the welcome route, so it can be
 * referenced using the route helper.
 */
Route::nexus('')->name('home');

Route::middleware(['auth'])->group(function () {
    Route::laravext("dashboard");
    Route::laravext('settings');
});

Route::middleware(['guest'])->group(function () {
    Route::nexus('login');
    Route::nexus('register');
});


