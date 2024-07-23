<?php

namespace App\Http\QueryBuilders\Sorts;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\Sorts\Sort;

class TopInfinity implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        return $query->withCount(['reads as infinity_reads_count'])->orderBy('infinity_reads_count', $descending ? 'desc' : 'asc');
    }
}
