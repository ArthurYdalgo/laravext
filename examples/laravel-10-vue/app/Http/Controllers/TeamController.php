<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Http\Requests\Team\StoreRequest;
use App\Http\Requests\Team\UpdateRequest;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamController extends Controller
{
    public function index()
    {
        return JsonResource::collection(Team::withCount(['developers'])->paginate());
    }

    public function store(StoreRequest $request)
    {
        return Team::create($request->validated());
    }

    public function show(Team $team)
    {
        $team->loadCount(['developers']);
        
        return $team;
    }

    public function update(UpdateRequest $request, Team $team)
    {
        $team->update($request->validated());

        return $team;
    }

    public function destroy(Team $team)
    {
        $team->delete();

        return response()->noContent();
    }
}
