<?php

namespace Laravext;

use Illuminate\Support\ServiceProvider;
use Illuminate\Routing\Router;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Laravext\Router as LaravextRouter;
use SplFileInfo;

class LaravextServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     */
    public function boot()
    {
        $this->publishes([
            __DIR__ . '/../config/config.php' => config_path('laravext.php'),
        ], 'config');
    }

    /**
     * Register the application services.
     */
    public function register()
    {
        // Automatically apply the package configuration
        $this->mergeConfigFrom(__DIR__ . '/../config/config.php', 'laravext');

        // Register the main class to use with the facade
        $this->app->singleton(ResponseFactory::class);

        $this->registerBladeDirectives();
        $this->registerRequestMacro();
        $this->registerRouterMacro();
    }

    protected function registerRequestMacro(): void
    {
        Request::macro('laravext', function () {
            return (bool) $this->header('X-Laravext');
        });
    }

    protected function registerBladeDirectives(): void
    {
        $this->callAfterResolving('blade.compiler', function ($blade) {
            $blade->directive('laravextScripts', [Directive::class, 'laravextScripts']);
            $blade->directive('nexus', [Directive::class, 'nexus']);
            $blade->directive('strand', [Directive::class, 'strand']);
        });
    }

    protected function registerRouterMacro(): void
    {
        Router::macro('nexus', function ($uri = '{nexusSlug?}', $component = null, $props = [], $root_view = null) {
            return $this->match(['GET', 'HEAD'], $uri, function () use ($component, $props, $root_view) {
                return nexus($component, $props)->rootView($root_view)->render();
            });
        });

        Router::macro('laravext', function ($uri = null, $props = [], $route_group_attributes = [], $root_view = null) {
            unset($route_group_attributes['prefix']);

            return $this->group($route_group_attributes, function () use ($uri, $props, $root_view) {
                $nexus_root = config('laravext.nexus_root');
                $case_sensitive_component_matcher = config('laravext.case_sensitive_component_matcher', false);
                $router_cache_driver = config('laravext.router_cache_driver', 'file');
                $router_cacher_is_enabled = config('laravext.router_cacher_is_enabled', true);
                $router_route_name_is_enabled = config('laravext.router_route_naming_is_enabled', true);
                
                $router_cacher_key = LaravextRouter::generateRoutingTreeCacheKey($nexus_root);
                
                if(!$router_cacher_is_enabled) {
                    Cache::store($router_cache_driver)->forget(LaravextRouter::generateRoutingTreeCacheKey($nexus_root));
                }

                $files = Cache::store($router_cache_driver)->rememberForever($router_cacher_key, function () use ($nexus_root) {
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
                            'path' => $path,
                            'filename' => $filename,
                            'pathname' => $pathname,
                            'relative_path_name' => $relative_path_name->toString(),
                            'relative_path' => $relative_path->toString(),
                            'extension' => $extension,
                        ];
                    })->values()->toArray();
                });

                foreach ($files as $file) {
                    $extension = $file['extension'];

                    $relative_path_name = str($file['relative_path_name']);

                    if ($relative_path_name->startsWith(['/'])) {
                        $relative_path_name = $relative_path_name->replaceFirst('/', '');
                    }

                    if ($uri) {
                        $uri = str($uri);

                        if ($uri->endsWith('/')) {
                            $uri = $uri->replaceLast('/', '');
                        }

                        if ($uri->startsWith('/')) {
                            $uri = $uri->replaceFirst('/', '');
                        }

                        if (!$relative_path_name->startsWith($uri)) {
                            continue;
                        }
                    }

                    $route_uri = $relative_path_name->replace('\\', '/')->when(str($relative_path_name)->startsWith('/'), function ($str) {
                        return $str->replaceFirst('/', '');
                    })->when($extension, function ($string) use ($extension) {
                        return $string->replaceLast(".$extension", '');
                    });

                    $route_uri = $case_sensitive_component_matcher ? $route_uri : $route_uri->lower();

                    $name = !$router_route_name_is_enabled ? null : $route_uri->explode('/')->map(function ($segment) {
                        return str($segment)->remove(["{", "}", "?"]);
                    })->join('.');


                    $this->nexus($route_uri, $route_uri, $props, $root_view)->name($name);
                }
            });
        });
    }
}
