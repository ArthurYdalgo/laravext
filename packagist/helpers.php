<?php

use Laravext\Laravext;
use Laravext\LaravextFacade;
use Laravext\ResponseFactory;

if (! function_exists('laravext_location')) {
    /**
     * Inertia location helper.
     *
     * @param  string  url
     * @return \Symfony\Component\HttpFoundation\Response
     */
    function laravext_location($url)
    {
        $instance = Laravext::getFacadeRoot();

        return $instance->location($url);
    }
}

if (! function_exists('laravext')){
    function laravext($component = null, $props = []){
        return Laravext::nexus($component, $props);
    }
}

if (! function_exists('nexus')){
    function nexus($component = null, $props = []){
        laravext($component, $props);
    }
}
