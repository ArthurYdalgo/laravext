<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
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

    Route::nexus('settings/appearance')->middleware(['password.confirm'])->name('settings.appearance');
});

Route::middleware(['guest'])->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::nexus('register')->name('register');

    // This route is explicitly named to be consistent with the Laravel default
    // You can also change the link generation method in the AppServiceProvider
    Route::nexus('reset-password/{token}')->name('password.reset');
});


