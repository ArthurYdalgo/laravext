<?php

namespace ArthurYdalgo\Laravext;

use Illuminate\Support\ServiceProvider;
use Illuminate\Routing\Router;
use Illuminate\View\FileViewFinder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
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
            return $this->match(['GET', 'HEAD'], $uri, function() use ($component, $props, $root_view){
                return laravext($component, $props)->rootView($root_view)->render();
            });
        });

        Router::macro('laravext', function ($uri = '{laravextSlug?}', $props = [], $root_view = null) {
            $page_components_root = config('laravext.page_components_root');
            $case_sensitive_component_matcher = config('laravext.case_sensitive_component_matcher', false);
            $router_cache_driver = config('laravext.router_cache_driver', 'file');
            $router_cacher_is_enabled = config('laravext.router_cacher_is_enabled', true);
            $router_cache_key = config('laravext.router_cacher_key', 'laravext-route-cache');

            if(!$router_cacher_is_enabled){
                
                Cache::store($router_cache_driver)->forget($router_cache_key);
            }
            
            $files = Cache::store($router_cache_driver)->rememberForever($router_cache_key, function() use ($page_components_root){
                $files = File::allFiles($page_components_root);

                return collect($files)->map(function(SplFileInfo $file) use ($page_components_root) {
                    $extension = $file->getExtension();

                    $path = $file->getPath();
                    $filename = $file->getFilename();
                    $pathname = $file->getPathname();

                    $relative_path_name = str($pathname)->replaceFirst($page_components_root, '');
                    $relative_path = str($path)->replaceFirst($page_components_root, '');

                    if($relative_path_name->startsWith(['/', '\\'])){
                        $relative_path_name = $relative_path_name->substr(1);
                    }

                    if($relative_path->startsWith(['/', '\\'])){
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

            foreach($files as $file){
                $extension = $file['extension'];

                $route_uri = str($file['relative_path_name'])->replace('\\', '/')->when($extension, function($string) use ($extension){
                    return $string->replaceLast(".$extension", '');
                });

                $route_uri = $case_sensitive_component_matcher ? $route_uri : $route_uri->lower();

                $this->nexus($route_uri, $file['relative_path_name'], $props, $root_view);
            }

            $default_nexus_component = config('laravext.default_nexus_component');
            
            if($default_nexus_component){
                $this->nexus(component: $default_nexus_component);
            }

            return $this;
        });
    }
}
