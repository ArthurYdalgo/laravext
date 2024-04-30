<?php

namespace App\Http\Controllers;

use App\Models\Developer;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectDeveloperController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Project $project)
    {
        $ids = $request->all();
        
        Developer::whereIn('id', $ids)->update(['project_id' => $project->id]);

        return response()->noContent();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $ids = $request->all();

        $project->developers()->update(['project_id' => null]);

        Developer::whereIn('id', $ids)->update(['project_id' => $project->id]);

        return response()->noContent();
    }

    public function destroy(Request $request, Project $project)
    {
        $ids = $request->all();
        
        $project->developers()->whereIn('developer_id', $ids)->update(['project_id' => null]);

        return response()->noContent();
    }
}
