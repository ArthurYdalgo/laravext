<?php

namespace App\Http\QueryBuilders\Filters;

use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

class Relevance implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $user = user();

        if(!$value || !$user){
            return $query;
        }

        return $query->where(function($query) use ($value, $user) {
            if(in_array($value, ['tag', 'any'])){
                $query->orWhereHas('tags', function($query) use ($user){
                    $query->whereRaw("tags.id IN (SELECT tag_id FROM user_tag WHERE user_id = ?)", [$user->id]);
                });
            }
    
            if(in_array($value, ['author', 'any'])){
                $query->orWhereRaw("articles.user_id IN (SELECT followee_id FROM follows WHERE follower_id = ? and ended_at is not null)", [$user->id]);
            }

            if(in_array($value, ['bookmarks', 'any'])){
                $query->orWhereRaw("articles.id IN (SELECT article_id FROM bookmarks WHERE user_id = ?)", [$user->id]);
            }

            return $query;
        });
    }
}