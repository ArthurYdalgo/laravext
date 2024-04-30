<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\Comment\StoreRequest;
use App\Http\Requests\Project\Comment\UpdateRequest;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Comment;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Project $project)
    {
        return JsonResource::collection($project->comments()->latest()->paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request, Project $project)
    {
        return $project->comments()->create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project, Comment $comment)
    {
        return $comment;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Project $project, Comment $comment)
    {
        $comment->update($request->validated());

        return $comment;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project, Comment $comment)
    {
        $comment->delete();

        return response()->noContent();
    }
}
