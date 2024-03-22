<?php

namespace ArthurYdalgo\Laravext;

use Illuminate\Support\ServiceProvider;
use Illuminate\Routing\Router;
use Illuminate\View\FileViewFinder;
use Illuminate\Http\Request;


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
        $this->app->singleton('laravext', function () {
            return new Laravext;
        });

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
        Router::macro('nexus', function ($uri, $component, $props = [], $root_view = null) {
            return $this->match(['GET', 'HEAD'], $uri, function() use ($component, $props, $root_view){
                $root_view ??= config('laravext.root_view');

                return laravext($component, $props)->rootView($root_view)->render();
            });
        });

        Router::macro('laravext', function ($props = [], $root_view = null) {
            
            return $this->match(['GET', 'HEAD'], 'welcome', function() use ($props, $root_view){
                $root_view ??= config('laravext.root_view');

                return laravext('Welcome', $props)->rootView($root_view)->render();
            });

            return $this;
        });
    }
}
