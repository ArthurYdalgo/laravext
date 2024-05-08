<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\Project\StoreRequest;
use App\Http\Requests\Project\UpdateRequest;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['index']]);    
    }

    public function index()
    {
        return JsonResource::collection(Project::paginate());
    }


    public function store(StoreRequest $request)
    {
        return Project::create($request->validated());
    }

    public function show(Project $project)
    {
        return $project;
    }

    public function update(UpdateRequest $request, Project $project)
    {
        $project->update($request->validated());

        return $project;
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->noContent();
    }
}
