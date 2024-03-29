<?php

namespace Laravext;

class Directive
{
    /**
     * Compiles the "@laravextScripts" directive.
     *
     * @param string $expression
     */
    public static function laravextScripts($expression = ''): string
    {
        return '<script id="laravext-scripts">
            window.__laravext = {!! json_encode(isset($laravext) ? $laravext : []) !!}
        </script>';
    }

    /**
     * Compiles the "@metropoly" directive.
     *
     * @param string $expression
     */
    public static function nexus($expression = '')
    {
        $skeleton_content = '';

        if($expression) {
            $args = explode(',', $expression);
            eval('$skeleton = ' . $args[0] . ';');
    
            $skeleton_content = view($skeleton)->render();   
        }
        
        $template = '<section section-type="laravext-nexus-section">{!! $laravext["nexus"]["server_skeleton"] ?? \''. $skeleton_content . '\' !!}</section>';

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

        $strand_data = isset($args[1]) && $args[1] ? $args[1] : '[]';
        
        $id = str()->random($strand_id_length);

        $template = '<section id="' . $id . '" section-type="laravext-strand-section" strand-component="' . $component . '" strand-data=\'{!! json_encode('. $strand_data .')!!}\'></section>';

        return $template    ;
    }

}
