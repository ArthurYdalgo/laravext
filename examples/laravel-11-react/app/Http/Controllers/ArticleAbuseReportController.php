<?php

namespace App\Http\Controllers;

use App\Http\Requests\Article\AbuseReport\StoreRequest;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleAbuseReportController extends Controller
{
    public function store(StoreRequest $request, Article $article)
    {
        $data = $request->validated();

        $abuse_report = $article->abuseReports()->create([
            'type' => $data['type'],
            'message' => $data['message'],
            'user_id' => user()->id,
            'ip_address' => $request->ip(),
        ]);

        return $this->successResponse($abuse_report);
    }
}
