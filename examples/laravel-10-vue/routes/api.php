<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CurrentUserController;
use App\Http\Controllers\DeveloperController;
use App\Http\Controllers\ProjectCommentController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectDeveloperController;
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
    
    Route::apiResource('developers', DeveloperController::class);
    Route::apiResource('teams', TeamController::class);
    Route::apiResource('companies', CompanyController::class);
    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('projects.comments', ProjectCommentController::class);
    Route::apiResource('projects.developers', ProjectDeveloperController::class)->only(['store', 'update', 'destroy']);
});