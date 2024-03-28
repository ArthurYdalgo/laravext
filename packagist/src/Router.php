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

        return [
            'name' =>  str($directory_path)->replaceFirst($root, '')->explode('/')->last(),
            'path' => $directory_path,
            'relative_path' => str($directory_path)->replaceFirst("$root/", '')->toString(),
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
            'loading' => '/loading(\.html|\.jsx|\.tsx|\.vue)$/',
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

    public static function getRoutingTree($nexus_root, $cached = true, $cache_driver = 'file')
    {
        $nexus_directories = self::getNexusDirectories($nexus_root, $cached, $cache_driver);
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
