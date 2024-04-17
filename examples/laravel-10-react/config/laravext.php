<?php

return [

    /**
     * The root view where the @nexus directive is at.
     */
    'root_view' => env('VEXT_ROOT_VIEW', 'sections.app'),

    /**
     * The directory where the nexus files are stored. This is used by the router to automagically
     * generate routes for the nexus files.
     */
    'nexus_directory' => env("VEXT_NEXUS_DIRECTORY", resource_path('js/nexus')),
    
    /**
     * Whether or not the router should be case sensitive. If set as false, the routes will be lower-cased.
     */
    'router_is_case_sensitive' => env('VEXT_ROUTER_IS_CASE_SENSITIVE', false),

    /**
     * The driver to use for caching the routes.
     */
    'router_cache_driver' => env('VEXT_ROUTER_CACHE_DRIVER', env('CACHE_DRIVER', 'file')),

    /**
     * Wheter or not the router cacher is enabled.
     */
    'router_cacher_is_enabled' => env('VEXT_ROUTER_CACHER_IS_ENABLED', !in_array(env('APP_ENV'), ['local','testing'])),

    /**
     * Wheter ot not the routes should be automagically named.
     */
    'router_route_naming_is_enabled' => env('VEXT_ROUTER_ROUTE_NAMING_IS_ENABLED', true),

    /**
     * The length of the strand id. Honestly these ids are not used for anything, but I did it just in case.
     */
    'strand_id_length' => 64,

    /**
     * By default, these are the file extensions that will be used to search for the nexus files. Change it to your liking.
     */
    'file_extensions' => ['jsx', 'tsx', 'js', 'ts', 'vue'],
];