<?php

namespace App\Http\Controllers;

use App\Http\Requests\Comment\DestroyRequest;
use App\Http\Requests\Comment\ReplyRequest;
use App\Http\Requests\Comment\UpdateRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class CommentController extends Controller
{
    public function replies(Comment $comment)
    {
        $replies = QueryBuilder::for($comment->replies())
            ->with('user')
            ->withCount(['reactions'])
            ->allowedFilters([
                AllowedFilter::callback('exclude_ids', function ($query, $ids) {
                    $ids = is_array($ids) ? $ids : explode(',', $ids);

                    $query->whereNotIn('comments.id', $ids);
                }),
            ])
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

    public function reply(ReplyRequest $request, Comment $comment)
    {
        $reply = $comment->replies()->create([
            'user_id' => user()->id,
            'content' => $request->validated('content'),
        ]);

        $reply->load('user');
        $reply->append('html');
        $reply->loadCount(['reactions', 'replies']);

        return $this->successResponse(new CommentResource($reply));
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

    public function update(UpdateRequest $request, Comment $comment)
    {
        $comment->update([
            'content' => scriptStripper($request->content),
        ]);

        $comment->append('html');
        $comment->load('user');
        $comment->loadCount(['reactions', 'replies']);

        return $this->successResponse(new CommentResource($comment));
    }
}
