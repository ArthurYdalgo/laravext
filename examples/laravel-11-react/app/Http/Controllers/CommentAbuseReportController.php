<?php

namespace App\Http\Controllers;

use App\Http\Requests\Comment\AbuseReport\StoreRequest;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentAbuseReportController extends Controller
{
    public function store(StoreRequest $request, Comment $comment)
    {
        $data = $request->validated();

        $abuse_report = $comment->abuseReports()->create([
            'type' => $data['type'],
            'message' => $data['message'],
            'user_id' => user()->id,
            'ip_address' => $request->ip(),
        ]);

        return $this->successResponse($abuse_report);
    }
}
