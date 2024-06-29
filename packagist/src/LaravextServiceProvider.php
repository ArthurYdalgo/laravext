<?php

namespace Laravext;

use Closure;
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
        $this->registerConsoleCommands();
        
        $this->publishes([
            __DIR__ . '/../config/config.php' => config_path('laravext.php'),
        ], 'laravext-config');
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

    protected function registerConsoleCommands(): void
    {
        if (! $this->app->runningInConsole()) {
            return;
        }

        $this->commands([
            Commands\StartSsr::class,
            Commands\StopSsr::class,
        ]);
    }

    protected function registerBladeDirectives(): void
    {
        $this->callAfterResolving('blade.compiler', function ($blade) {
            $blade->directive('laravextScripts', [Directive::class, 'laravextScripts']);
            $blade->directive('nexus', [Directive::class, 'nexus']);
            $blade->directive('startNexus', [Directive::class, 'startNexus']);
            $blade->directive('endNexus', [Directive::class, 'endNexus']);
            $blade->directive('strand', [Directive::class, 'strand']);
            $blade->directive('startStrand', [Directive::class, 'startStrand']);
            $blade->directive('endStrand', [Directive::class, 'endStrand']);
        });
    }

    protected function registerRouterMacro(): void
    {
        Router::macro('nexus', function ($uri = '{nexusSlug?}', $page = null, $root_view = null, ...$parameters) {
            return $this->match(['GET', 'HEAD'], $uri, function () use ($uri, $page, $root_view, $parameters)  {
                if(isset($parameters['merge_with_existing_route']) && !boolval($parameters['merge_with_existing_route'])){
                    Laravext::clearUriCache($uri);
                }
        
                return nexus($page)->rootView($root_view)->render();
            });
        });

        Router::macro('laravext', function ($uri = null, $route_group_attributes = [], $root_view = null) {
            unset($route_group_attributes['prefix']);
            $nexus_directory = config('laravext.nexus_directory');

            LaravextRouter::laravextRouteGroup($this, $uri, $nexus_directory, $route_group_attributes, $root_view);
        });
    }
}

