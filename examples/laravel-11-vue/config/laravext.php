<?php

return [

    /**
     * The root view where the @nexus directive is at.
     */
    'root_view' => env('LARAVEXT_ROOT_VIEW', 'sections.guest'),

    /**
     * The directory where the nexus files are stored. This is used by the router to automagically
     * generate routes for the nexus files.
     */
    'nexus_directory' => env("LARAVEXT_NEXUS_DIRECTORY", resource_path('js/nexus')),
    
    /**
     * Whether or not the router should be case sensitive. If set as false, the routes will be lower-cased.
     */
    'router_is_case_sensitive' => env('LARAVEXT_ROUTER_IS_CASE_SENSITIVE', false),

    /**
     * The driver to use for caching the routes.
     */
    'router_cache_driver' => env('LARAVEXT_ROUTER_CACHE_DRIVER', env('CACHE_DRIVER', 'file')),

    /**
     * Whether or not the router cacher is enabled.
     */
    'router_cache_is_enabled' => env('LARAVEXT_ROUTER_CACHE_IS_ENABLED', !in_array(env('APP_ENV'), ['local','testing'])),

    /**
     * Whether ot not the routes should be automagically named.
     */
    'router_route_naming_is_enabled' => env('LARAVEXT_ROUTER_ROUTE_NAMING_IS_ENABLED', true),

    /**
     * The length of the strand id. Honestly these ids are not used for anything, but I did it just in case.
     */
    'strand_id_length' => 64,

    /**
     * By default, these are the file extensions that will be used to search for the nexus files. Change it to your liking.
     */
    'file_extensions' => ['vue'],

    /**
     * The router automatically generates a version based on the build files or the assets' url, but in case you want to
     * set a version manually, you can do it here. This will be used to check if the client and server versions match,
     * and force a reload if they don't at the next page visit.
     * 
     * If you're in you local environment, it will use a fixed version, so the router doesn't force a reload every time
     * you visit the page.
     */
    'version' => in_array(env('APP_ENV'), ['local']) ? 'fixed-local-version' : env('LARAVEXT_VERSION'),

    /**
     * In case you want to force a page visit, you can set this to true. This will force the client to reload the page for every visit.
     * This is only affected if you're using the visit helper in the client.
     */
    'force_page_visit' => env('LARAVEXT_FORCE_PAGE_VISIT', false),

    /**
     * This config is used to determine if the server should render the javascript or not.
     * 
     * @see https://laravext.dev/#/server-side-rendering/javascript-runtime
     */
    'ssr' => [
        /**
         * The URL where the server side rendering will be done.
         */
        'url' => env('LARAVEXT_JAVASCRIPT_SERVER_SIDE_RENDERING_URL', 'http://localhost:13714/render'),

        /**
         * If set to true, the server will attempt to server side render your javascript, and if set to false, it won't.
         */
        // 'enabled' => env('LARAVEXT_JAVASCRIPT_SERVER_SIDE_RENDERING_ENABLED', true),

        /**
         * You can also set as 'only' or 'except' to specify the URIs that should(n't) be SSR'd, if for some reason you need this
         * kind of control.
         */
        // 'enabled' => 'only',
        'enabled' => 'except',

        /**
         * The URIs that should/should not be SSR'd. This validation is dependent on the enabled config.
         * 
         * If enabled is set to 'only', the URIs listed here will be the only ones that will be SSR'd.
         * If enabled is set to 'except', the URIs listed here will be the ones that won't be SSR'd.
         * 
         * If enabled is set to true, this config will be ignored.
         * 
         * Internally this is checked using the request()->is(config('laravext.ssr.uris', []))
         */
        'uris' => [
            // 'example/{uri}/pattern/*',
            // 'another-example/{uri}'
        ],

        /**
         * The route names that should/should not be SSR'd. This validation is dependent on the enabled config.
         * 
         * If enabled is set to 'only', the route names listed here will be the only ones that will be SSR'd.
         * If enabled is set to 'except', the route names listed here will be the ones that won't be SSR'd.
         * 
         * If enabled is set to true, this config will be ignored.
         * 
         * Internally this is checked using the request()->routeIs(config('laravext.ssr.route_names', []))
         */
        'route_names' => [
            // 'route.name',
            // 'route.name_pattern.*'
        ],

        // You may want to change this, if needed.
        // 'bundle' => env('LARAVEXT_JAVASCRIPT_SERVER_SIDE_RENDERING_BUNDLE', 'app.js'),
    ],
];