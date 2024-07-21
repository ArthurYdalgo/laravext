<?php

namespace App\Http\QueryBuilders\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\Sorts\Sort;

class Relevance implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $user = user();

        if (!$user) {
            return $query;
        }
        
        $followedUserIds = DB::table('follows')
            ->where('follower_id', $user->id)
            ->pluck('followee_id');

        $userTagIds = DB::table('user_tag')
            ->where('user_id', $user->id)
            ->pluck('tag_id');

        // Construct the base query with the necessary joins
        $query->leftJoin('article_tag', 'articles.id', '=', 'article_tag.article_id')
            ->leftJoin('tags', function ($join) use ($userTagIds) {
                $join->on('article_tag.tag_id', '=', 'tags.id')
                    ->whereIn('tags.id', $userTagIds);
            });

        // Add follow_relevance to the query
        if ($followedUserIds->isNotEmpty()) {
            $query->addSelect(DB::raw("
            IF(articles.user_id IN (" . $followedUserIds->implode(',') . "), 2, 0) as follow_relevance
        "));
        } else {
            $query->addSelect(DB::raw("0 as follow_relevance"));
        }

        // Add tag_match_count to the query
        $query->addSelect(DB::raw('COUNT(tags.id) as tag_match_count'));

        // Group by article ID and order by relevance and match count
        return $query->groupBy('articles.id')
            ->orderByRaw('follow_relevance DESC, tag_match_count DESC, published_at DESC');
    }
}
