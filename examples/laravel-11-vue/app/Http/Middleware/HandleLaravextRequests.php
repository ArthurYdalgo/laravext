<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravext\Middleware;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpFoundation\Response;
use Tighten\Ziggy\Ziggy;

class HandleLaravextRequests extends Middleware
{
    public function share(Request $request)
    {   
        $now = now();
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => [
                ...(new Ziggy())->toArray(),
                'location' => $request->url(),
            ],
        ]);

    }
}
