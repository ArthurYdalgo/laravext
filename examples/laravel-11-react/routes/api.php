<?php

use App\Http\Controllers\ArticleCommentController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CurrentUserController;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'auth'
], function () {
    Route::get("user", [CurrentUserController::class, 'show'])->middleware('auth');
    Route::put("user", [CurrentUserController::class, 'update'])->middleware('auth');
    Route::post('login', [CurrentUserController::class, 'login']);
    Route::post('logout', [CurrentUserController::class, 'logout'])->middleware('auth');
});



Route::group([
    'middleware' => 'auth'
], function () {

    Route::apiResource('articles', ArticleController::class);
    Route::apiResource('articles.comments', ArticleCommentController::class)->only(['store', 'index']);

    Route::prefix('articles/{article}')->group(function () {
        Route::get('reactions', [ArticleController::class, 'userReactions']);
        Route::get('bookmark', [ArticleController::class, 'hasBookmarked']);

        Route::post('reactions', [ArticleController::class, 'react']);
        Route::post('bookmark', [ArticleController::class, 'bookmark']);

        Route::put('bookmark', [ArticleController::class, 'toggleBookmark']);

        Route::delete('reactions', [ArticleController::class, 'unreact']);
        Route::delete('bookmark', [ArticleController::class, 'unbookmark']);
    });

    Route::prefix('comments/{comment}')->group(function () {
        Route::get('reactions', [CommentController::class, 'userReactions']);
        Route::get('replies', [CommentController::class, 'replies']);

        Route::post('reactions', [CommentController::class, 'react']);
        Route::post('replies', [CommentController::class, 'reply']);

        Route::put('', [CommentController::class, 'update']);

        Route::delete('', [CommentController::class, 'destroy']);
        Route::delete('reactions', [CommentController::class, 'unreact']);
    });
});
