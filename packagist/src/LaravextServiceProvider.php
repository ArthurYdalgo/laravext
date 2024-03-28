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
        Router::macro('nexus', function ($uri = '{nexusSlug?}', $page = null, $props = [], $root_view = null, ...$parameters) {

            return $this->match(['GET', 'HEAD'], $uri, function () use ($page, $props, $root_view, $parameters) {
                $middleware = $parameters['middleware'] ?? null;
                $layout = $parameters['layout'] ?? null;
                $loading = $parameters['loading'] ?? null;
                $error = $parameters['error'] ?? null;
                $with_trashed = $parameters['with_trashed'] ?? false;

                return nexus($page, $props)->rootView($root_view)
                    ->withMiddleware($middleware)
                    ->withLayout($layout)
                    ->withLoading($loading)
                    ->withError($error)->render();
            });
        });

        Router::macro('laravext', function ($uri = null, $props = [], $route_group_attributes = [], $root_view = null) {
            unset($route_group_attributes['prefix']);
            $nexus_root = config('laravext.nexus_root');

            LaravextRouter::laravextRouteGroup($this, $nexus_root, $props = [], $route_group_attributes = [], $root_view = null);
        });
    }
}
