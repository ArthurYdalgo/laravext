<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function successResponse($data = null, $message = null, $status = 200)
    {
        $response_data = [
            'message' => $message ?? 'Request successful',
        ];

        if($data) {
            $response_data['data'] = $data;
        }
        
        return response()->json($response_data, $status);
    }

    public function errorResponse($message = null, $status = 400)
    {
        return response()->json([
            'message' => $message ?? 'Request failed',
        ], $status);
    }
}
