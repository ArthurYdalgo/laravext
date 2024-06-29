<?php

use Laravext\Laravext;

if (! function_exists('nexus')){
    function nexus($page = null, $props = []){
        return Laravext::nexus($page, $props);
    }
}
