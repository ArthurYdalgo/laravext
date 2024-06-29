<?php

namespace Laravext;

class Directive
{
    /**
     * This declares a __laravext variable that contains informations about the page, such as props, shared props,
     * route/query parameters, etc.
     * 
     * @see https://laravext.dev/docs/blade-directives#laravextScripts
     *
     * @param string $expression
     */
    public static function laravextScripts($expression = '')
    {
        return '<script id="laravext-scripts">
            window.__laravext = {
                page_data: {!! json_encode(isset($laravext_page_data) ? $laravext_page_data : []) !!}
            };
        </script>';
    }

    /**
     * The nexus directive is used to define where the main page of a route will be inserted. You can pass an expression
     * which will be used as a "path.to.a.view", and it will be rendered as a skeleton while your javascript loads.
     * This is done to create a better user experience, so the user won't see a white screen while waiting.
     * 
     * This skeleton will be overwritten if a loading.html file is in the directory of the current page. 
     *
     * @see https://laravext.dev/docs/blade-directives#nexus
     * 
     * @param string $expression
     */
    public static function nexus($expression = '')
    {   
        
        $template = '<section section-type="laravext-nexus-section">{!! $laravext_page_data["nexus"]["server_skeleton"] ?? "" !!}</section>';
        
        return $template;
    }

    /**
     * The startNexus directive is used to define where the main page of a route will be inserted. This version of the directive
     * is similar to the nexus directive, but it doesn't render the server skeleton. This is useful when you want to render 
     * something else inside it using blade directives for more complex server side rendering.
     *
     * @see https://laravext.dev/docs/blade-directives#start-nexus
     * 
     * @param string $expression
     */
    public static function startNexus($expression = '')
    {   
        $template = '<section section-type="laravext-nexus-section">';
        return $template;
    }

    /**
     * The endNexus directive is used to close the startNexus
     *
     * @see https://laravext.dev/docs/blade-directives#end-nexus
     * 
     * @param string $expression
     */
    public static function endNexus($expression = '')
    {   
        $template = '</section>';
        return $template;
    }

    /**
     * The strand directive is used to insert a react component inside the blade, but outside a nexus.
     * 
     * @see https://laravext.dev/docs/blade-directives#strand
     * 
     * @param string expression
     */
    public static function strand($expression = '')
    {
        $strand_id_length = config('laravext.strand_id_length', 64);

        $component = '';

        if (!$expression) {
            return '';
        }

        $args = explode(',', $expression);

        eval('$component = ' . $args[0] . ';');

        $strand_data = isset($args[1]) && $args[1] ? $args[1] : '[]';
        
        $id = str()->random($strand_id_length);

        $template = '<section id="' . $id . '" section-type="laravext-strand-section" strand-component="' . $component . '" strand-data=\'{!! json_encode('. $strand_data .')!!}\'></section>';

        return $template;
    }

    public static function startStrand($expression = '')
    {
        $strand_id_length = config('laravext.strand_id_length', 64);

        $component = '';

        if (!$expression) {
            return '';
        }

        $args = explode(',', $expression);

        eval('$component = ' . $args[0] . ';');

        $strand_data = isset($args[1]) && $args[1] ? $args[1] : '[]';
        
        $id = str()->random($strand_id_length);

        $template = '<section id="' . $id . '" section-type="laravext-strand-section" strand-component="' . $component . '" strand-data=\'{!! json_encode('. $strand_data .')!!}\'>';

        return $template;
    }

    public static function endStrand($expression = '')
    {
        return '</section>';
    }

}
