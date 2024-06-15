<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Http\Requests\Team\StoreRequest;
use App\Http\Requests\Team\UpdateRequest;
use App\Models\Developer;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamController extends Controller
{
    public function index()
    {
        $search = request()->query('search');
        $teams = Team::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%$search%");
            })
            ->withCount(['developers', 'projects'])
            ->paginate(request()->query('per_page', 10))
            ->appends(request()->query());

        return JsonResource::collection($teams);
    }

    public function store(StoreRequest $request)
    {
        return Team::create($request->validated());
    }

    public function show(Team $team)
    {
        $team->load(['developers']);
        
        return $team;
    }

    public function update(UpdateRequest $request, Team $team)
    {
        $data = collect($request->validated())->only(['name'])->toArray();

        $team->update($data);

        $developer_ids = $request->validated(['developer_ids']);

        $team->developers()->update(['team_id' => null]);

        Developer::whereIn('id', $developer_ids)->update(['team_id' => $team->id]);

        return $team;
    }

    public function destroy(Team $team)
    {
        $team->delete();

        return response()->noContent();
    }
}
