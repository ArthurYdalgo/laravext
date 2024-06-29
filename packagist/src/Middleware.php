<?php

namespace Laravext;

use Laravext\Laravext;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\HttpFoundation\Response;

class Middleware
{
    /**
     * Defines the props that are shared by default.
     *
     * @return array
     */
    public function share(Request $request)
    {
        return [
            'auth' => [
                'user' => $request->user(),
            ]
        ];
    }

    
    /**
     * Handle the incoming request.
     *
     * @return Response
     */
    public function handle(Request $request, Closure $next)
    {
        Laravext::share($this->share($request));

        return $next($request);
    }

    /**
     * Determines what to do when an action returned with no response.
     */
    public function onEmptyResponse(Request $request, Response $response): Response
    {
        return Redirect::back();
    }
}
