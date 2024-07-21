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
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\AllowedInclude;
use Spatie\QueryBuilder\QueryBuilder;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexRequest $request)
    {
        $scout_is_available = scoutIsAvailable();
        
        $search = $request->query('q');

        $articles_query = $scout_is_available ? Article::search($search) : Article::when($search, function($query) use($search) {
            $query->where(function($subquery) use($search) {
                $subquery->where('articles.title', 'like', "%{$search}%")->orWhere('articles.subtitle', 'like', "%{$search}%")
                ->orWhereHas("author", function($subsubquery) use($search) {
                    $subsubquery->where('authors.name', 'like', "{$search}%");
                })->orWhereHas("tags", function($subsubquery) use($search) {
                    $subsubquery->where('tags.slug', 'like', "$search");
                })->orWhereJsonContains('articles.keywords', $search);
            });
        });
            
        $articles = QueryBuilder::for($articles_query)
        ->allowedIncludes([
            'user', 'tags',
            AllowedInclude::count('reactionsCount'),
            AllowedInclude::count('commentsCount'),
        ])
        ->withGroupedReactions()
        ->latest()->paginate(10);

        $articles->makeHidden(['content', 'html']);

        return JsonResource::collection($articles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        /** @todo  @see https://laracasts.com/discuss/channels/laravel/how-to-remove-script-tags-from-the-markdown-input-by-the-user */

        // function scriptStripper($input)
        // {
        //     return preg_replace('#<script(.*?)>(.*?)</script>#is', '', $input);
        // }
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
