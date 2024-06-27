<?php

namespace Laravext\Ssr;

use Exception;
use Illuminate\Support\Facades\Http;

class HttpGateway implements Gateway
{
    /**
     * Dispatch the Inertia page to the Server Side Rendering engine.
     */
    public function dispatch(string $html): ?Response
    {
        if (! config('laravext.ssr.enabled', true) || ! (new BundleDetector())->detect()) {
            return null;
        }

        $url = str_replace('/render', '', config('laravext.ssr.url', 'http://127.0.0.1:13714')).'/render';

        try {
            $response = Http::post($url, compact('html'))->throw()->json();

            return $response;
        } catch (Exception $e) {
            report($e);

            return null;
        }
    }
}
