<?php

namespace Laravext;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use SplFileInfo;
use Illuminate\Support\Str;

class Router
{
    public static function parseDirectory($directory_path, $root, $parent_conventions = [])
    {
        $root = Str::replace('\\', '/', $root);
        $directory_path = Str::replace('\\', '/', $directory_path);

        if (Str::endsWith($root, '/')) {
            $root = Str::replaceLast('/', '', $root);
        }

        if (Str::endsWith($directory_path, '/')) {
            $directory_path = Str::replaceLast('/', '', $directory_path);
        }

        $name = str($directory_path)->replaceFirst($root, '')->explode('/')->last();
        $is_directory_a_group = preg_match('/\([\w]+\)$/', $name);

        $conventions = array_merge($parent_conventions, self::parseDirectoryConventions($directory_path, $root));

        $children_directories = [];

        foreach (File::directories($directory_path) as $child_directory) {
            $parsed_children_directory = self::parseDirectory($child_directory, $root, $is_directory_a_group ? $conventions : $parent_conventions);

            $children_directories[] = $parsed_children_directory;
        }

        $relative_path = str($directory_path)->replaceFirst($root, '')->toString();
        $relative_path = Str::startsWith($relative_path, '/') ? Str::replaceFirst('/', '', $relative_path) : $relative_path;
        $relative_path = str($relative_path)->explode('/')->filter()->implode('/');

        return [
            'name' =>  str($directory_path)->replaceFirst($root, '')->explode('/')->last(),
            'path' => $directory_path,
            'relative_path' => $relative_path,
            'conventions' => $conventions,
            'is_group' => $is_directory_a_group,
            'children' => $children_directories,
        ];
    }

    public static function parseDirectoryConventions($directory_path, $root)
    {
        $root = Str::replace('\\', '/', $root);
        $directory_path = Str::replace('\\', '/', $directory_path);

        if (Str::endsWith($root, '/')) {
            $root = Str::replaceLast('/', '', $root);
        }

        if (Str::endsWith($directory_path, '/')) {
            $directory_path = Str::replaceLast('/', '', $directory_path);
        }

        $files = File::files($directory_path);

        $convention_patterns = [
            'loading' => '/loading(\.jsx|\.tsx|\.vue)$/',
            'layout' => '/layout(\.jsx|\.tsx|\.vue)$/',
            'middleware' => '/middleware(\.jsx|\.tsx|\.vue)$/',
            'error' => '/error(\.jsx|\.tsx|\.vue)$/',
            'page' => '/page(\.jsx|\.tsx|\.vue)$/',
        ];

        $conventions = [];

        foreach ($convention_patterns as $convention => $pattern) {
            foreach ($files as $file) {
                if (preg_match($pattern, $file->getFilename())) {
                    $convention_relative_path = str($directory_path)->replaceFirst($root, '')->toString();
                    $convention_relative_path = Str::startsWith($convention_relative_path, '/') ? Str::replaceFirst('/', '', $convention_relative_path) : $convention_relative_path;
                    $conventions[$convention] = str($convention_relative_path)->explode('/')->filter()->push($file->getFilename())->implode('/');
                    break;
                }

                if (preg_match('/loading(\.html)$/', $file->getFilename())) {
                    $conventions['server_skeleton'] = File::get($file->getPathname());
                }
            }
        }

        return $conventions;
    }


    public static function getNexusDirectories($nexus_root, $cached = true, $cache_driver = 'file')
    {
        $cache_key = self::generateRoutingTreeCacheKey($nexus_root);

        if (!$cached || app()->environment(['local', 'testing'])) {
            Cache::store($cache_driver)->forget($cache_key);
        }

        return Cache::store($cache_driver)->rememberForever($cache_key, function () use ($nexus_root) {
            return self::parseDirectory($nexus_root, $nexus_root);
        });
    }

    public static function laravextNexusRoutes($uri, &$router, $directory, $props = [], $root_view = null)
    {
        $case_sensitive_component_matcher = config('laravext.case_sensitive_component_matcher', false);
        $router_route_name_is_enabled = config('laravext.router_route_naming_is_enabled', true);

        $page = $directory['conventions']['page'] ?? null;

        if ($page) {
            $segments = str($directory['relative_path'])->when(!$case_sensitive_component_matcher, function ($str) {
                return $str->lower();
            })->explode('/')->filter(function ($segment) {
                return !preg_match('/\([\w]+\)$/', $segment);
            });

            $route_uri = $segments->implode('/');
            $name = $router_route_name_is_enabled ? $segments->map(function ($segment) {
                return str($segment)->remove(["{", "}", "?"]);
            })->join('.') : null;

            $server_skeleton = $directory['conventions']['server_skeleton'] ?? null;
            $middleware = $directory['conventions']['middleware'] ?? null;
            $loading = $directory['conventions']['loading'] ?? null;
            $layout = $directory['conventions']['layout'] ?? null;
            $error = $directory['conventions']['error'] ?? null;

            Cache::store('array')->put("laravext-uri:{$route_uri}-cache", [
                'server_skeleton' => $server_skeleton,
                'middleware' => $middleware,
                'loading' => $loading,
                'layout' => $layout,
                'error' => $error,
                'page' => $page, 
                'uri' => $route_uri,
                'name' => $name,
            ]);

            if ($uri) {
                $uri = str($uri);

                if ($uri->endsWith('/')) {
                    $uri = $uri->replaceLast('/', '');
                }

                if ($uri->startsWith('/')) {
                    $uri = $uri->replaceFirst('/', '');
                }

                // if (!str($route_uri)->startsWith($uri)) {
                //     continue;
                // }
            }

            // dd(compact('uri', 'route_uri', 'name', 'server_skeleton', 'middleware', 'loading', 'layout', 'error', 'page'));

            if(!$uri || ($uri && str($route_uri)->startsWith($uri))) {
                $router->nexus(
                    $route_uri,
                    $page,
                    $props,
                    $root_view,
                    server_skeleton: $server_skeleton,
                    middleware: $middleware,
                    loading: $loading,
                    layout: $layout,
                    error: $error
                )->name($name);
            }
        }

        foreach ($directory['children'] as $child) {
            self::laravextNexusRoutes($uri, $router, $child, $props, $root_view);
        }
    }

    public static function laravextRouteGroup($uri, &$router, $nexus_root, $props = [], $route_group_attributes = [], $root_view = null)
    {
        $router_cache_driver = config('laravext.router_cache_driver', 'file');
        $router_cacher_is_enabled = config('laravext.router_cacher_is_enabled', true);

        try {
            $nexus_directories = self::getNexusDirectories($nexus_root, $router_cacher_is_enabled, $router_cache_driver);
        } catch (\Throwable $th) {
            dd($th->getMessage(), $nexus_root);
        }


        return $router->group($route_group_attributes, function () use ($uri, $router, $props, $root_view, $nexus_directories) {
            self::laravextNexusRoutes($uri, $router, $nexus_directories, $props, $root_view);
        });
    }

    public static function generateRoutingTreeCacheKey($nexus_root)
    {
        $version = self::version();

        return str("laravext-router-routing-tree-{$nexus_root}")->when($version, function ($key, $version) {
            return "{$key}:{$version}";
        });
    }

    public static function version()
    {
        if (config('app.asset_url')) {
            return md5(config('app.asset_url'));
        }

        if (file_exists($manifest = public_path('mix-manifest.json'))) {
            return md5_file($manifest);
        }

        if (file_exists($manifest = public_path('build/manifest.json'))) {
            return md5_file($manifest);
        }

        return null;
    }
}
