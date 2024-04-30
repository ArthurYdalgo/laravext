<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CurrentUserController;
use App\Http\Controllers\DeveloperController;
use App\Http\Controllers\ProjectCommentController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectDeveloperController;
use App\Http\Controllers\TeamController;
use App\Models\Author;
use App\Models\Book;
use App\Models\Chapter;
use App\Models\User;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

Route::group([
    // 'middleware' => 'auth'
], function(){
    Route::put("auth/user", [CurrentUserController::class, 'update']);
    
    Route::apiResource('developers', DeveloperController::class);
    Route::apiResource('teams', TeamController::class);
    Route::apiResource('companies', CompanyController::class);
    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('projects.comments', ProjectCommentController::class);
    Route::apiResource('projects.developers', ProjectDeveloperController::class)->only(['store', 'update', 'destroy']);
});