<?php

return [

    /**
     * The root template that is loaded on the first page visit
     */
    'root_view' => env('VEXT_ROOT_VIEW', 'sections.app'),

    'default_nexus_component' => env('VEXT_DEFAULT_NEXUS_COMPONENT'),

    'case_sensitive_component_matcher' => env('VEXT_CASE_SENSITIVE_COMPONENT_MATCHER', false),

    'nexus_root' => env("VEXT_NEXUS_ROOT", resource_path('js/nexus')),

    'strands_root' => env('VEXT_COMPONENTS_ROOT', resource_path('js/strands')),

    'router_cache_driver' => env('VEXT_ROUTER_CACHE_DRIVER', env('CACHE_DRIVER', 'file')),

    'router_cacher_is_enabled' => env('VEXT_ROUTER_CACHER_IS_ENABLED', !app()->environment(['local', 'testing'])),

    'router_cacher_key_prefix' => env('VEXT_ROUTER_CACHER_KEY_PREFIX'),

    'router_route_naming_is_enabled' => env('VEXT_ROUTER_ROUTE_NAMING_IS_ENABLED', true),

    'strand_id_length' => 64,

    /**
     * 
     */
    'router_mode' => 'app',
];