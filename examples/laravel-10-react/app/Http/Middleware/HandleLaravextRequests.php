<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravext\Middleware;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpFoundation\Response;
use Tightenco\Ziggy\Ziggy;

class HandleLaravextRequests extends Middleware
{
    public function share(Request $request)
    {   
        $now = now();
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'motivation' => 'Laravext is a package that helps you to create a Laravel project with a lot of features already implemented.',
            'date' => $now->format('Y-m-d'),
            'time' => $now->format('H:i:s'),
            'datetime' => $now->format('Y-m-d H:i:s'),
            'unix' => $now->timestamp,
        ]);

    }
}
