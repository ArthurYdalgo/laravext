<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Laravext\Middleware;

class HandleLaravextRequests extends Middleware
{
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
        ]);
    }
}
