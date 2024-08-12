<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedInclude;
use Spatie\QueryBuilder\QueryBuilder;

class ArticleCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Article $article)
    {
        $comments = QueryBuilder::for($article->comments())
        ->allowedIncludes([
            'user', 'tags',
        ])
        ->withCount(['reactions', 'replies'])
        ->latest()
        // ->sortBy('reactions_count')   
        ->paginate(min(200, $request->query('per_page', 20)))
        ->appends($request->query());

        $comments->each(function (Comment $comment) {
            $comment->append('html');
        });

        return CommentResource::collection($comments);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Article $article)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Article $article)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article, Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article, Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article, Comment $comment)
    {
        //
    }

    public function replies(Article $article, Comment $comment)
    {
        //
    }

    public function storeReply(Request $request, Article $article, Comment $comment)
    {
        //
    }
}
