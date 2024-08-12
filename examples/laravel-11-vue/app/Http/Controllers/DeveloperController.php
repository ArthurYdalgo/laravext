<?php

namespace App\Http\Controllers;

use App\Models\Developer;
use App\Http\Requests\Developer\StoreRequest;
use App\Http\Requests\Developer\UpdateRequest;
use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class DeveloperController extends Controller
{
    public function index()
    {
        $search = request()->query('search');

        $developers = QueryBuilder::for(Developer::class)
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%$search%")
                        ->orWhere('email', 'like', "%$search%")
                        ->orWhere('username', 'like', "%$search%");
                });
            })
            ->allowedFilters([
                AllowedFilter::callback('team_ids', function ($query, $team_ids) {
                    $team_ids = is_array($team_ids) ? $team_ids : explode(',', $team_ids);
                    return $query->whereIn('team_id', $team_ids);
                }),
                AllowedFilter::callback('not_team_ids', function ($query, $team_ids) {
                    $team_ids = is_array($team_ids) ? $team_ids : explode(',', $team_ids);


                    return $query->where(function ($query) use($team_ids) {
                        $query->whereNotIn('team_id', $team_ids)->orWhereNull('team_id');
                    });
                }),
                AllowedFilter::callback('doesnt_have_a_team', function ($query, $doesnt_have_a_team) {
                    if (is_null($doesnt_have_a_team)) {
                        return $query;
                    }

                    if ($doesnt_have_a_team) {
                        return $query->whereNull('team_id');
                    }

                    return $query->whereNotNull('team_id');
                }),
                AllowedFilter::callback('without_ids', function ($query, $ids) {
                    $ids = is_array($ids) ? $ids : explode(',', $ids);
                    return $query->whereNotIn('id', $ids);
                }),
                AllowedFilter::callback('prioritize_developers_in_team', function ($query, $team_id) {
                    $query->orderByRaw("team_id = {$team_id} desc, id asc");
                }),
            ])
            ->allowedIncludes(['team'])
            ->paginate(request()->query('per_page', 10))
            ->appends(request()->query());

        return JsonResource::collection($developers);
    }


    public function store(StoreRequest $request)
    {
        return Developer::create($request->validated());
    }

    public function show(Developer $developer)
    {
        $developer->load(['team']);
        
        return $developer;
    }

    public function update(UpdateRequest $request, Developer $developer)
    {
        $developer->update($request->validated());

        return $developer;
    }

    public function destroy(Developer $developer)
    {
        $developer->delete();

        return response()->noContent();
    }
}
