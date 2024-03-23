<?php

namespace ArthurYdalgo\Laravext;

use ArthurYdalgo\Laravext\Laravext;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\HttpFoundation\Response;

class Middleware
{
    public function version(Request $request)
    {
        if (config('app.asset_url')) {
            return md5(config('app.asset_url'));
        }

        if (file_exists($manifest = public_path('mix-manifest.json'))) {
            return md5_file($manifest);
        }

        if (file_exists($manifest = public_path('build/manifest.json'))) {
            return md5_file($manifest);
        }

        return null;
    }

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
        // Inertia::setRootView($this->rootView($request));

        $response = $next($request);
        // $response->headers->set('Vary', 'X-Inertia');

        // if (! $request->header('X-Inertia')) {
        //     return $response;
        // }

        // if ($response->isOk() && empty($response->getContent())) {
        //     $response = $this->onEmptyResponse($request, $response);
        // }

        // if ($response->getStatusCode() === 302 && in_array($request->method(), ['PUT', 'PATCH', 'DELETE'])) {
        //     $response->setStatusCode(303);
        // }

        return $response;
    }

    /**
     * Determines what to do when an Inertia action returned with no response.
     * By default, we'll redirect the user back to where they came from.
     */
    public function onEmptyResponse(Request $request, Response $response): Response
    {
        return Redirect::back();
    }
}
