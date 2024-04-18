<?php

use Laravext\Laravext;
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

if (! function_exists('nexus')){
    function nexus($page = null, $props = []){
        return Laravext::nexus($page, $props);
    }
}
