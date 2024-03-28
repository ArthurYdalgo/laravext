<?php

namespace Laravext;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use SplFileInfo;

class Router
{
    public static function getNexusDirectories($nexus_root, $cached = true, $cache_driver = 'file')
    {
        $cache_key = self::generateRoutingTreeCacheKey($nexus_root);

        if (!$cached || app()->environment(['local', 'testing'])) {
            Cache::store($cache_driver)->forget($cache_key);
        }

        return Cache::store($cache_driver)->rememberForever($cache_key, function () use ($nexus_root) {
            $files = File::allFiles($nexus_root);

            return collect($files)->map(function (SplFileInfo $file) use ($nexus_root) {
                $extension = $file->getExtension();

                $path = $file->getPath();
                $filename = $file->getFilename();
                $pathname = $file->getPathname();

                $relative_path_name = str($pathname)->replaceFirst($nexus_root, '');
                $relative_path = str($path)->replaceFirst($nexus_root, '');

                if ($relative_path_name->startsWith(['/', '\\'])) {
                    $relative_path_name = $relative_path_name->substr(1);
                }

                if ($relative_path->startsWith(['/', '\\'])) {
                    $relative_path = $relative_path->substr(1);
                }

                $extension = $extension ? $extension : null;


                return [
                    'path' => str_replace('\\', '/', $path),
                    'filename' => $filename,
                    'pathname' => str_replace('\\', '', $pathname),
                    'relative_path_name' => str_replace('\\', '/', $relative_path_name->toString()),
                    'relative_path' => str_replace('\\', '/', $relative_path->toString()),
                    'extension' => $extension,
                ];
            })->values()->toArray();
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
