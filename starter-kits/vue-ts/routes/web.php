<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\VerifyEmailController;

Route::view('', 'welcome')->name('welcome');

Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
->middleware(['auth:sanctum', 'signed', 'throttle:6,1'])
->name('verification.verify');

require __DIR__.'/laravext.php';
