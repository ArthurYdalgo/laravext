<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\Project\StoreRequest;
use App\Http\Requests\Project\UpdateRequest;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return JsonResource::collection(Project::paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        return Project::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return $project;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Project $project)
    {
        $project->update($request->validated());

        return $project;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return response()->noContent();
    }
}
