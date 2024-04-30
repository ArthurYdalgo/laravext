<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Http\Requests\Team\StoreRequest;
use App\Http\Requests\Team\UpdateRequest;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return JsonResource::collection(Team::withCount(['developers'])->paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        return Team::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Team $team)
    {
        return $team;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Team $team)
    {
        $team->update($request->validated());

        return $team;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team)
    {
        $team->delete();

        return response()->noContent();
    }
}
