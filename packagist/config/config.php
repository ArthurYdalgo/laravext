<?php

return [

    /**
     * The root template that is loaded on the first page visit
     */
    'root_view' => env('VEXT_ROOT_VIEW', 'app'),

    'default_nexus_component' => env('VEXT_DEFAULT_NEXUS_COMPONENT'),

    'case_sensitive_component_matcher' => env('VEXT_CASE_SENSITIVE_COMPONENT_MATCHER', false),

    'page_components_root' => env("VEXT_PAGE_COMPONENTS_ROOT", resource_path('js/pages')),

    'router_cache_driver' => env('VEXT_ROUTER_CACHE_DRIVER', env('CACHE_DRIVER', 'file')),

    'router_cacher_is_enabled' => env('VEXT_ROUTER_CACHER_IS_ENABLED', !app()->environment(['local', 'testing'])),

    'router_cacher_key' => env('VEXT_ROUTER_CACHER_KEY'),

    'strand_id_length' => 64,
];