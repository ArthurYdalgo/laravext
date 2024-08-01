<?php

use App\Http\Controllers\AbuseReportController;
use App\Http\Controllers\ArticleCommentController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CurrentUserController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\Tools\MarkdownPreviewController;
use App\Http\Controllers\UserAbuseReportController;
use App\Http\Controllers\UserAvatarController;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'auth'
], function () {
    Route::get("user", [CurrentUserController::class, 'show'])->middleware('auth');
    Route::put("user", [CurrentUserController::class, 'update'])->middleware('auth');

    Route::post("user/avatar", [UserAvatarController::class, 'store'])->middleware('auth');
    Route::delete("user/avatar", [UserAvatarController::class, 'destroy'])->middleware('auth');

    Route::post('login', LoginController::class);
    Route::post('register', RegisterController::class)->middleware('guest');
    Route::post('logout', LogoutController::class)->middleware('auth');
});


Route::group([
    'middleware' => 'auth'
], function () {

    Route::apiResource('articles', ArticleController::class)->withoutMiddleware('auth')->only(['index', 'show']);
    Route::apiResource('articles', ArticleController::class)->only(['store', 'update', 'destroy']);

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

    Route::post('users/{user}/abuse-reports', [UserAbuseReportController::class, 'store']);

    Route::apiResource('abuse-reports', AbuseReportController::class)->except(['store'])->middleware('admin');


});

Route::group([
    'prefix' => 'tools'
], function () {
    Route::post('article/markdown-preview', [MarkdownPreviewController::class, 'preview'])->middleware('auth');

    Route::group([
        'prefix' => 'users'
    ], function () {
        Route::get('{follower}/is-following/{followee}', [FollowerController::class, 'isFollowing']);
        Route::get('{followee}/is-followed-by/{follower}', [FollowerController::class, 'isFollowedBy']);

        Route::put('follow/{followee}', [FollowerController::class, 'follow']);
        Route::put('unfollow/{followee}', [FollowerController::class, 'unfollow']);
    });
});