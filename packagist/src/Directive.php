<?php

namespace ArthurYdalgo\Laravext;

use Illuminate\Support\Facades\View;

class Directive
{
    /**
     * Compiles the "@laravextScripts" directive.
     *
     * @param string $expression
     */
    public static function laravextScripts($expression = ''): string
    {
        return '';
    }

    /**
     * Compiles the "@metropoly" directive.
     *
     * @param string $expression
     */
    public static function nexus($expression = '')
    {
        $template = '<section section-type="laravel-nexus-section" nexus-data="{{ json_encode($laravext) }}"></section>';

        return $template;
    }

    public static function strand($expression = '')
    {
        $strand_id_length = config('laravext.strand_id_length', 128);

        $component = '';
        $props = [];

        if (!$expression) {
            return '';
        }

        $args = explode(',', $expression);

        eval('$component = ' . $args[0] . ';');

        if(isset($args[1])){
            eval('$props = ' . $args[1] . ';');
        }
        
        $id = str()->random($strand_id_length);
        $data = json_encode(compact('props'));

        $template = "<section id='{$id}' section-type='laravel-strand-section' strand-component='{$component}' strand-data='{$data}'></section>";

        return $template    ;
    }

}
