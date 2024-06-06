<?php

namespace App\Http\Controllers;

use App\Models\Developer;
use App\Http\Requests\Developer\StoreRequest;
use App\Http\Requests\Developer\UpdateRequest;
use Illuminate\Http\Resources\Json\JsonResource;

class DeveloperController extends Controller
{
    public function index()
    {
        $search = request()->query('search');
        $filter = request()->query('filter');
        $prioritize_developers_in_team = request()->query('prioritize_developers_in_team');
        $not_in_team_ids = $filter['not_in_team_id'] ?? null;
        $in_team_ids = $filter['in_team_id'] ?? null;
        $doesnt_have_a_team = $filter['doesnt_have_a_team'] ?? null;

        $developers = Developer::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%$search%")
                    ->orWhere('email', 'like', "%$search%");
            })
            ->when($prioritize_developers_in_team, function ($query) use ($prioritize_developers_in_team) {
                $query->orderByRaw("team_id = {$prioritize_developers_in_team} desc, id asc");
            })
            ->with(['team'])
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
