<?php

namespace App\Http\Controllers;

use App\Models\Developer;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamDeveloperController extends Controller
{
    public function index(Team $team)
    {
        $developers = $team->developers()
            ->latest()->paginate();

        return JsonResource::collection($developers);
    }

    public function store(Request $request, Team $team)
    {
        $ids = $request->all();
        
        Developer::whereIn('id', $ids)->update(['team_id' => $team->id]);

        return response()->noContent();
    }

    public function update(Request $request, Team $team)
    {
        $ids = $request->all();

        $team->developers()->update(['team_id' => null]);

        Developer::whereIn('id', $ids)->update(['team_id' => $team->id]);

        return response()->noContent();
    }

    public function destroy(Request $request, Team $team)
    {
        $ids = $request->all();
        
        $team->developers()->whereIn('developers.id', $ids)->update(['team_id' => null]);

        return response()->noContent();
    }
}
