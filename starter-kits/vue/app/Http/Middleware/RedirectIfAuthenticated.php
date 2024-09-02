<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Auth\Middleware\RedirectIfAuthenticated as RedirectIfAuthenticatedMiddleware;

class RedirectIfAuthenticated extends RedirectIfAuthenticatedMiddleware
{

    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                if ($request->expectsJson()) {
                    return response()->json([
                        'message' => 'Authenticated users cannot access this resource.'
                    ], 403); 
                }

                return redirect($this->redirectTo($request));
            }
        }

        return $next($request);
    }

}