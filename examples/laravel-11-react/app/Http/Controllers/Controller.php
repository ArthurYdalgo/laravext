<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function successResponse($data, $message = null, $status = 200)
    {
        return response()->json([
            'data' => $data,
            'message' => $message ?? 'Request successful'
        ], $status);
    }

    public function errorResponse($message, $status = 400)
    {
        return response()->json([
            'message' => $message
        ], $status);
    }
}
