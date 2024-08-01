<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\AbuseReport\StoreRequest;
use App\Models\AbuseReport;
use App\Models\User;
use Illuminate\Http\Request;

class UserAbuseReportController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request, User $user)
    {
        $data = $request->validated();

        $abuse_report = $user->abuseReports()->create([
            'type' => $data['type'],
            'message' => $data['message'],
            'user_id' => user()->id,
            'ip_address' => $request->ip(),
        ]);

        return $this->successResponse($abuse_report);
    }
}
