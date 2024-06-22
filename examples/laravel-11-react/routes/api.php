<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ContactRequestController;
use App\Http\Controllers\CurrentUserController;
use App\Http\Controllers\DeveloperController;
use App\Http\Controllers\ProjectCommentController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TeamDeveloperController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'auth'
], function(){
    Route::get("user", [CurrentUserController::class, 'show'])->middleware('auth');
    Route::put("user", [CurrentUserController::class, 'update'])->middleware('auth');
    Route::post('login', [CurrentUserController::class, 'login']);
    Route::post('logout', [CurrentUserController::class, 'logout'])->middleware('auth');
});

Route::group([
    'middleware' => 'auth'
], function(){
    
    
    
});