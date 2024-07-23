<?php

namespace App\Http\QueryBuilders\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\Sorts\Sort;

class TopWeek implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        return $query->withCount(['reads as week_reads_count' => function ($query) {
            $query->where('reads.created_at', '>=', now()->subWeek());
        }])->orderBy('week_reads_count', $descending ? 'desc' : 'asc');
    }
}
