<?php

namespace Laravext;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use SplFileInfo;
use Illuminate\Support\Str;

class Router
{
    public static $convention_extensions = ['jsx', 'tsx', 'js', 'ts', 'vue'];

    /**
     * This method parsed the directory, and recursively parsed the children directories. It will return a tree of the directories, containing
     * the name, path, relative path, conventions, whether it is a group, and its children.
     * 
     * When a directory is a group, the conventions will cascade down to children directories, and will only be overwriten if the child directory
     * has its own conventions, but will still be aplied to other children directories, unless another group that declares the same conventions
     * is found.
     * 
     * @see https://laravext.dev/docs/routing/conventions
     * 
     * @param string $directory_path
     * @param string $root
     * @param array $parent_conventions
     * 
     * @return array
     */
    public static function parseDirectory($directory_path, $root, $parent_conventions = [])
    {
        $root = self::replaceReverseSlashes($root);
        $directory_path = self::replaceReverseSlashes($directory_path);

        $root = self::trimEndingSlash($root);
        $directory_path = self::trimEndingSlash($directory_path);

        $name = str($directory_path)->replaceFirst($root, '')->explode('/')->last();
        $is_directory_a_group = preg_match('/\([\w]+\)$/', $name);

        $conventions = array_merge($parent_conventions, self::parseDirectoryConventions($directory_path, $root));

        $children_directories = [];

        foreach (File::directories($directory_path) as $child_directory) {
            $parsed_children_directory = self::parseDirectory($child_directory, $root, $is_directory_a_group ? $conventions : $parent_conventions);

            $children_directories[] = $parsed_children_directory;
        }

        $relative_path = self::generateRelativePath($directory_path, $root);

        return [
            'name' =>  str($directory_path)->replaceFirst($root, '')->explode('/')->last(),
            'path' => $directory_path,
            'relative_path' => $relative_path,
            'conventions' => $conventions,
            'is_group' => $is_directory_a_group,
            'children' => $children_directories,
        ];
    }

    /**
     * This method parsed the directory to verify if there're any conventions. These conversion are based on the Next.js App Router conventions, with
     * the addition of a loading.html which will be used as the server_skeleton. This is used to render the server side skeleton of the page.
     * 
     * @see https://laravext.dev/docs/routing/conventions
     * @see https://nextjs.org/docs/app/building-your-application/routing#file-conventions
     * 
     * @param string $directory_path
     * @param string $root
     * 
     * @return array
     */
    public static function parseDirectoryConventions($directory_path, $root)
    {
        $root = self::replaceReverseSlashes($root);
        $directory_path = self::replaceReverseSlashes($directory_path);

        $root = self::trimEndingSlash($root);

        $directory_path = self::trimEndingSlash($directory_path);

        $files = File::files($directory_path);

        $convention_patterns = self::generateFileConventionPatterns();

        $conventions = [];

        $relative_path = self::generateRelativePath($directory_path, $root);

        foreach ($files as $file) {
            foreach ($convention_patterns as $convention => $pattern) {
                if (preg_match($pattern, $file->getFilename())) {
                    $conventions[$convention] = collect([$relative_path, $file->getFilename()])->filter()->implode('/');
                    break;
                }
            }

            if (preg_match('/loading\.html$/', $file->getFilename())) {
                $conventions['server_skeleton'] = File::get($file->getPathname());
            }
        }

        return $conventions;
    }

    /**
     * Get the Nexus directories. This method will recursively parse the directories and their files, and return a tree of the directories.
     * These directories will contain the name, path, relative path, conventions, whether it is a group, and its children.
     * For efficiency, the result will be cached.
     * 
     * @param string $nexus_root
     * @param bool $cached
     * @param string $cache_driver
     * 
     * @return array
     */
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

    /**
     * Generate route segments from a relative path.
     */
    public static function generateRouteSegments($relative_path, $case_sensitive_component_matcher = null)
    {
        $case_sensitive_component_matcher ??= config('laravext.case_sensitive_component_matcher', false);
        return str($relative_path)->when(!$case_sensitive_component_matcher, function ($str) {
            return $str->lower();
        })->explode('/')->filter(function ($segment) {
            return !preg_match('/\([\w]+\)$/', $segment);
        });
    }

    /**
     * Define the Nexus routes, and recursively define the children Nexus routes.
     * 
     * @param \Illuminate\Routing\Router $router
     * @param string $uri
     * @param array $directory
     * 
     */
    public static function laravextNexusRoutes(&$router, $directory, $uri, $props = [], $root_view = null)
    {
        $router_route_name_is_enabled = config('laravext.router_route_naming_is_enabled', true);

        $page = $directory['conventions']['page'] ?? null;

        if ($page) {
            $segments = self::generateRouteSegments($directory['relative_path']);

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

            $uri = $uri ? self::trimStartingSlash($uri) : null;

            if (!$uri || ($uri && str($route_uri)->startsWith($uri))) {
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

        foreach ($directory['children'] as $child_directory) {
            self::laravextNexusRoutes($router, $child_directory, $uri, $props, $root_view);
        }
    }

    /**
     * Define a group of routes, containing Nexus routes.
     * 
     * @param \Illuminate\Routing\Router $router
     * @param string $uri
     * @param string $nexus_root
     * @param array $props
     * @param array $route_group_attributes
     * @param string|null $root_view
     * 
     * @return \Illuminate\Routing\Router
     */
    public static function laravextRouteGroup(&$router, $uri, $nexus_root, $props = [], $route_group_attributes = [], $root_view = null)
    {
        $router_cache_driver = config('laravext.router_cache_driver', 'file');
        $router_cacher_is_enabled = config('laravext.router_cacher_is_enabled', true);

        $nexus_directories = self::getNexusDirectories($nexus_root, $router_cacher_is_enabled, $router_cache_driver);

        return $router->group($route_group_attributes, function () use ($uri, $router, $props, $root_view, $nexus_directories) {
            self::laravextNexusRoutes($router, $nexus_directories, $uri, $props, $root_view);
        });
    }

    // Helpers

    /**
     * Generate a cache key for the routing tree.
     * 
     * @param string $nexus_root
     * 
     * @return string
     */
    public static function generateRoutingTreeCacheKey($nexus_root)
    {
        $version = self::version();

        return str("laravext-router-routing-tree-{$nexus_root}")->when($version, function ($key, $version) {
            return $key->append(":{$version}");
        })->toString();
    }

    /**
     * Get the version of the application.
     * 
     * @return string|null
     */
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

    /**
     * Trim the ending slash of a path.
     * 
     * @param string $path
     */
    public static function trimEndingSlash($path)
    {
        return Str::endsWith($path, '/') ? Str::replaceLast('/', '', $path) : $path;
    }

    /**
     * Trim the starting slash of a path.
     * 
     * @param string $path
     */
    public static function trimStartingSlash($path)
    {
        return Str::startsWith($path, '/') ? Str::replaceFirst('/', '', $path) : $path;
    }

    public static function trimSurroundingSlashes($path)
    {
        return self::trimStartingSlash(self::trimEndingSlash($path));
    }

    /**
     * Replace reverse slashes with forward slashes.
     * 
     * @param string $path
     */
    public static function replaceReverseSlashes($path)
    {
        return Str::replace('\\', '/', $path);
    }

    /**
     * Generate a relative path from a directory path.
     * 
     * @param string $directory_path
     * @param string $root
     * 
     * @return string
     */
    public static function generateRelativePath($directory_path, $root)
    {
        $relative_path = str($directory_path)->replaceFirst($root, '')->toString();
        return  str(self::trimStartingSlash($relative_path))->explode('/')->filter()->implode('/');
    }

    /**
     * Generate the convention patterns for the file conventions.
     * 
     * @param array $file_extensions
     * 
     * @return array
     */
    public static function generateFileConventionPatterns()
    {
        $file_extensions = config('laravext.file_extensions', self::$convention_extensions);

        $extension_patterns = collect($file_extensions)->map(function ($extension) {
            return "\.{$extension}";
        })->implode('|');

        return [
            'loading' => "/loading({$extension_patterns})$/",
            'layout' => "/layout({$extension_patterns})$/",
            'middleware' => "/middleware({$extension_patterns})$/",
            'error' => "/error({$extension_patterns})$/",
            'page' => "/page({$extension_patterns})$/",
        ];
    }
}
