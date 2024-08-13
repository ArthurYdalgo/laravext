<?php

namespace App\Http\Controllers;

use App\Http\Requests\Comment\DestroyRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function replies(Comment $comment)
    {
        $replies = $comment->replies()
            ->with('user')
            ->withCount(['reactions'])
            ->latest()
            ->when(user(), function ($query) {
                $query->with(['reactions' => function ($query) {
                    $query->where('reactions.user_id', user()->id);
                }]);
            })
            ->paginate(min(200, request()->query('per_page', 20)))
            ->appends(request()->query());

        $replies->each(function (Comment $reply) {
            $reply->append('html');
        });

        return CommentResource::collection($replies);
    }

    public function storeReply(Comment $comment)
    {
        //
    }

    public function like(Comment $comment)
    {
        user()->reactTo($comment, 'sparkle-heart');

        return $this->successResponse(user()->reactionsTo($comment));
    }

    public function unlike(Comment $comment)
    {
        user()->unreactTo($comment);

        return $this->successResponse(user()->reactionsTo($comment));
    }

    public function destroy(DestroyRequest $request, Comment $comment)
    {
        $comment->delete();

        return $this->successResponse();
        
    }
}
