<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\Comment\DestroyRequest;
use App\Http\Requests\Project\Comment\StoreRequest;
use App\Http\Requests\Project\Comment\UpdateRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Project;

class ProjectCommentController extends Controller
{
    public function index(Project $project)
    {
        $comments = $project->comments()
            ->with(['user'])
            ->withTrashed()
            ->latest()->paginate();

        return CommentResource::collection($comments);
    }

    public function store(StoreRequest $request, Project $project)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        $comment = $project->comments()->create($data);

        return new CommentResource($comment);
    }

    public function update(UpdateRequest $request, Project $project, Comment $comment)
    {
        $comment->update($request->validated());

        return new CommentResource($comment);
    }

    public function destroy(DestroyRequest $request, Project $project, Comment $comment)
    {
        $comment->delete();

        return response()->noContent();
    }
}
