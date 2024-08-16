<?php

namespace Laravext;

use Closure;
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
        $root = self::trimEndingSlash(self::replaceReverseSlashes($root));
        $directory_path = self::trimEndingSlash(self::replaceReverseSlashes($directory_path));

        if (!File::isDirectory($directory_path)) {
            return [
                'name' => null,
                'path' => null,
                'relative_path' => null,
                'conventions' => [],
                'is_directory_a_group' => false,
                'is_directory_group_also_a_segment' => false,
                'children' => [],
            ];
        }

        $name = str($directory_path)->replaceFirst($root, '')->explode('/')->last();
        $is_directory_a_group = preg_match('/\([\w-]+\)$/', $name) || preg_match('/\(\([\w-]+\)\)$/', $name);
        $is_directory_group_also_a_segment = (bool) preg_match('/\(\([\w-]+\)\)$/', $name);

        $conventions = array_merge($parent_conventions, self::parseDirectoryConventions($directory_path, $root));

        $children_directories = [];

        foreach (File::directories($directory_path) as $child_directory) {
            $cascated_conventions = $is_directory_a_group ? $conventions : $parent_conventions;

            if ($is_directory_a_group) {
                unset($cascated_conventions['page']);
            }

            $parsed_children_directory = self::parseDirectory($child_directory, $root, $cascated_conventions);

            $children_directories[] = $parsed_children_directory;
        }

        $relative_path = self::generateRelativePath($directory_path, $root);

        return [
            'name' =>  str($directory_path)->replaceFirst($root, '')->explode('/')->last(),
            'path' => $directory_path,
            'relative_path' => $relative_path,
            'conventions' => $conventions,
            'is_directory_a_group' => $is_directory_a_group,
            'is_directory_group_also_a_segment' => $is_directory_group_also_a_segment,
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
     * This method will recursively parse the directories and their files, and return a tree of the directories.
     * These directories will contain the name, path, relative path, conventions, whether it is a group, and its children.
     * For efficiency, the result will be cached.
     * 
     * @param string $nexus_directory
     * @param bool $cached
     * @param string $cache_driver
     * 
     * @return array
     */
    public static function getNexusDirectories($nexus_directory, $cached = true, $cache_driver = 'file')
    {
        $cache_key = self::generateRoutingTreeCacheKey($nexus_directory);

        if (!$cached) {
            Cache::store($cache_driver)->forget($cache_key);
        }

        return Cache::store($cache_driver)->rememberForever($cache_key, function () use ($nexus_directory) {
            return self::parseDirectory($nexus_directory, $nexus_directory);
        });
    }

    /**
     * Generate route segments from a relative path.
     */
    public static function generateRouteSegments($relative_path, $router_is_case_sensitive = null)
    {
        $router_is_case_sensitive ??= config('laravext.router_is_case_sensitive', false);
        return str($relative_path)->when(!$router_is_case_sensitive, function ($str) {
            return $str->lower();
        })->explode('/')->filter(function ($segment) {
            // We will filter out the segments that are just route groups.
            return (!preg_match('/\([\w-]+\)$/', $segment) || preg_match('/\(\([\w-]+\)\)$/', $segment));
        })->map(function ($segment) {
            // In case the route group should also be a segment, we will remove the parenthesis.
            if(preg_match('/\(\([\w-]+\)\)$/', $segment)) {
                return str($segment)->replaceFirst("((", "")->replaceLast("))", "");
            }

            return $segment;
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
    public static function laravextNexusRoutes(&$router, $directory, $uri, $root_view = null)
    {
        $router_route_name_is_enabled = config('laravext.router_route_naming_is_enabled', true);

        $page = $directory['conventions']['page'] ?? null;

        if ($page) {
            $segments = self::generateRouteSegments($directory['relative_path']);

            $route_uri = $segments->implode('/');

            $uri = $uri ? self::trimStartingSlash($uri) : null;

            if (!$uri || ($uri && str($route_uri)->startsWith($uri))) {
                $name = $router_route_name_is_enabled ? $segments->map(function ($segment) {
                    return str($segment)->remove(["{", "}", "?"]);
                })->join('.') : null;

                $server_skeleton = $directory['conventions']['server_skeleton'] ?? null;
                $middleware = $directory['conventions']['middleware'] ?? null;
                $layout = $directory['conventions']['layout'] ?? null;
                $error = $directory['conventions']['error'] ?? null;

                if ($route_uri == '') {
                    $route_uri = '/';
                }

                Cache::store('array')->put(
                    "laravext-uri:{$route_uri}-cache",
                    compact('server_skeleton', 'middleware', 'layout', 'error', 'page', 'uri', 'name', 'root_view')
                );

                $router->nexus(
                    $route_uri,
                    $page,
                    $root_view,
                    ...compact('middleware', 'layout', 'error', 'server_skeleton')
                )->name($name);
            }
        }

        foreach ($directory['children'] as $child_directory) {
            self::laravextNexusRoutes($router, $child_directory, $uri, $root_view);
        }
    }

    /**
     * Define a group of routes, containing Nexus routes.
     * 
     * @param \Illuminate\Routing\Router $router
     * @param string $uri
     * @param string $nexus_directory
     * @param array $route_group_attributes
     * @param string|null $root_view
     * 
     * @return \Illuminate\Routing\Router
     */
    public static function laravextRouteGroup(&$router, $uri, $nexus_directory, $route_group_attributes = [], $root_view = null)
    {
        $router_cache_driver = config('laravext.router_cache_driver', 'file');
        $router_cache_is_enabled = config('laravext.router_cache_is_enabled', true);

        $nexus_directories = self::getNexusDirectories($nexus_directory, $router_cache_is_enabled, $router_cache_driver);

        return $router->group($route_group_attributes, function () use ($uri, $router, $root_view, $nexus_directories) {
            self::laravextNexusRoutes($router, $nexus_directories, $uri, $root_view);
        });
    }

    // Helpers

    /**
     * Generate a cache key for the routing tree.
     * 
     * @param string $nexus_directory
     * 
     * @return string
     */
    public static function generateRoutingTreeCacheKey($nexus_directory)
    {
        $version = self::version();

        return str("laravext-router-routing-tree")->when($version, function ($key, $version) {
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
        if (config('laravext.version')) {
            return config('laravext.version');
        }

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
            'layout' => "/layout({$extension_patterns})$/",
            'middleware' => "/middleware({$extension_patterns})$/",
            'error' => "/error({$extension_patterns})$/",
            'page' => "/page({$extension_patterns})$/",
        ];
    }
}
