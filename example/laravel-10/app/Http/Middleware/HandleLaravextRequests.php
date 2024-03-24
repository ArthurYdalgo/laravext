<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravext\Middleware;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpFoundation\Response;

class HandleLaravextRequests extends Middleware
{
    public function share(Request $request)
    {
        return [
            'auth' => [
                'user' => $request->user(),
            ],
            'motivation' => 'Laravext is a package that helps you to create a Laravel project with a lot of features already implemented.',
        ];
    }
}
