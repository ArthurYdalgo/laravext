<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
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
    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('settings.profile');
});

Route::middleware(['guest'])->group(function () {
    Route::nexus('login')->name('login');
    Route::nexus('register')->name('register');
});


