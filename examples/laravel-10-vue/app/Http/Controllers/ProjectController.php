<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\Project\StoreRequest;
use App\Http\Requests\Project\UpdateRequest;
use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\QueryBuilder\QueryBuilder;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['index', 'show']]);
    }

    public function index()
    {
        $search = request()->query('search');
        $projects = QueryBuilder::for(Project::query())
            ->allowedFilters([
                'team_id',
                'company_id',
            ])
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%$search%");
            })
            ->with(['company', 'team'])
            ->paginate(request()->query('per_page', 10))
            ->appends(request()->query());

        return JsonResource::collection($projects);
    }

    public function store(StoreRequest $request)
    {
        return Project::create($request->validated());
    }

    public function show(Project $project)
    {
        $project->load(['company', 'team']);
        
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
