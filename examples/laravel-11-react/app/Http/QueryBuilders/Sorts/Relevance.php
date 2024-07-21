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

        $followedUserIds = DB::table('follows')
            ->where('follower_id', $user->id)
            ->pluck('followee_id');

        $userTagIds = DB::table('user_tag')
            ->where('user_id', $user->id)
            ->pluck('tag_id');


        if ($followedUserIds->isNotEmpty()) {
            $query->addSelect(DB::raw("
                    IF(articles.user_id IN (" . $followedUserIds->implode(',') . "), 2, 0) as follow_relevance
                "));
        } else {
            $query->addSelect(DB::raw("0 as follow_relevance"));
        }

        if ($userTagIds->isNotEmpty()) {
            $query->addSelect(DB::raw("
                    IF(tags.id IN (" . $userTagIds->implode(',') . "), 1, 0) as tag_relevance
                "));
        } else {
            $query->addSelect(DB::raw("0 as tag_relevance"));
        }

        return $query->leftJoin('article_tag', 'articles.id', '=', 'article_tag.article_id')
            ->leftJoin('tags', 'article_tag.tag_id', '=', 'tags.id')
            ->orderByRaw('follow_relevance + tag_relevance DESC');
    }
}
