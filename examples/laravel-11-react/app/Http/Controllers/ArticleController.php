<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\QueryBuilders\Filters\Relevance as RelevanceFilter;
use App\Http\QueryBuilders\Sorts\Relevance as RelevanceSort;
use App\Http\QueryBuilders\Sorts\TopInfinity;
use App\Http\QueryBuilders\Sorts\TopMonth;
use App\Http\QueryBuilders\Sorts\TopWeek;
use App\Http\QueryBuilders\Sorts\TopYear;
use App\Http\Requests\Article\DestroyRequest;
use App\Http\Requests\Article\IndexRequest;
use App\Http\Requests\Article\ReactRequest;
use App\Http\Requests\Article\StoreRequest;
use App\Http\Requests\Article\UnreactRequest;
use App\Http\Requests\Article\UpdateRequest;
use App\Http\Requests\Article\UserReactionsRequest;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedInclude;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexRequest $request)
    {

        $articles = QueryBuilder::for(Article::class)
            ->allowedIncludes([
                'user', 'tags',
                AllowedInclude::count('reactionsCount'),
                AllowedInclude::count('commentsCount'),
            ])
            ->allowedFilters([
                AllowedFilter::scope('search', 'whereScout'),
                AllowedFilter::exact('user_id'),
                AllowedFilter::callback('relevance', new RelevanceFilter),
                AllowedFilter::callback('tags', function ($query, $tags) {
                    $query->whereHas('tags', function ($query) use ($tags) {
                        $query->whereIn('slug', explode(',', $tags));
                    });
                }),
            ])
            ->allowedSorts([
                AllowedSort::custom('top_week', new TopWeek),
                AllowedSort::custom('top_month', new TopMonth),
                AllowedSort::custom('top_year', new TopYear),
                AllowedSort::custom('top_infinity', new TopInfinity),

            ])

            ->orderBy('published_at', 'desc')
            ->when(user(), function ($query) {
                $query->with(['bookmarks' => function ($query) {
                    $query->where('bookmarks.user_id', user()->id);
                }]);
            })
            ->available()
            ->withGroupedReactions()
            ->paginate(min(200, $request->query('per_page', 20)))
            ->appends($request->query());

        $articles->makeHidden(['content', 'html']);

        return ArticleResource::collection($articles);
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
        return $this->successResponse(user()->reactionsTo($article));
    }

    public function groupedReactions(Article $article)
    {
        $article->loadGroupedReactions();
        
        return $this->successResponse($article->reactions);
    }

    public function react(ReactRequest $request, Article $article)
    {
        user()->reactTo($article, $request->reaction);

        return $this->successResponse(user()->reactionsTo($article));
    }

    public function unreact(UnreactRequest $request, Article $article)
    {
        user()->unreactTo($article, $request->reaction);

        return $this->successResponse(user()->reactionsTo($article));
    }

    public function hasBookmarked(Article $article)
    {
        return $this->successResponse(['bookmarked' => user()->hasBookmarked($article)]);
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

        return $this->successResponse(['bookmarked' => user()->hasBookmarked($article)]);
    }

    public function unbookmark(Article $article)
    {
        user()->unbookmark($article);

        return $this->successResponse(['bookmarked' => user()->hasBookmarked($article)]);
    }
}
