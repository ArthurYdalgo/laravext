<?php

namespace Laravext\Ssr;

interface Gateway
{
    /**
     * Dispatch the Inertia page to the Server Side Rendering engine.
     */
    public function dispatch(string $html): ?Response;
}
