<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\DeleteUserController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\UpdateUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group([
    'prefix' => 'auth',
    'as' => 'api.auth.',
], function () {
    Route::middleware('auth:sanctum')->get('user', function (Request $request) {
        return $request->user();
    })->name("user");

    Route::post('register', [RegisteredUserController::class, 'store'])
        ->middleware('guest:sanctum')
        ->name('register');

    Route::post('login', [AuthenticatedSessionController::class, 'store'])
        ->middleware('guest:sanctum')
        ->name('login');

    Route::apiResource('tokens', TokenController::class)
        ->middleware(['auth:sanctum', 'verified'])
        ->only(['index', 'destroy', 'store']);

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->middleware('guest:sanctum')
        ->name('password.email');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->middleware('guest:sanctum')
        ->name('password.store');

    Route::put('user', UpdateUserController::class)->middleware(['auth:sanctum']);

    Route::delete('user', DeleteUserController::class)
        ->middleware(['auth:sanctum', 'verified']);

    Route::put('password', [PasswordController::class, 'update'])
        ->middleware(['auth:sanctum', 'verified'])
        ->name('password.update');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware(['auth:sanctum', 'throttle:6,1'])
        ->name('verification.send');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->middleware('auth:sanctum')
        ->name('logout');
});
