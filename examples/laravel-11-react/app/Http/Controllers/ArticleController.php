<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Article\DestroyRequest;
use App\Http\Requests\Article\IndexRequest;
use App\Http\Requests\Article\ReactRequest;
use App\Http\Requests\Article\StoreRequest;
use App\Http\Requests\Article\UnreactRequest;
use App\Http\Requests\Article\UpdateRequest;
use App\Http\Requests\Article\UserReactionsRequest;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexRequest $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Article $article)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DestroyRequest $request, Article $article)
    {
        $article->delete();

        return response()->noContent();
    }

    public function userReactions(Article $article)
    {
        return user()->reactionsTo($article);
    }

    public function react(ReactRequest $request, Article $article)
    {
        user()->reactTo($article, $request->reaction);

        return user()->reactionsTo($article);
    }

    public function unreact(UnreactRequest $request, Article $article)
    {
        user()->unreactTo($article, $request->reaction);

        return user()->reactionsTo($article);
    }

    public function hasBookmarked(Article $article)
    {
        return response()->json(['bookmarked' => user()->hasBookmarked($article)]);
    }

    public function toggleBookmark(Article $article)
    {
        if (user()->hasBookmarked($article)) {
            return $this->unbookmark($article);
        }

        return $this->bookmark($article);
    }

    public function bookmark(Article $article)
    {
        user()->bookmark($article);

        return response()->json(['bookmarked' => user()->hasBookmarked($article)]);
    }

    public function unbookmark(Article $article)
    {
        user()->unbookmark($article);

        return response()->json(['bookmarked' => user()->hasBookmarked($article)]);
    }
}