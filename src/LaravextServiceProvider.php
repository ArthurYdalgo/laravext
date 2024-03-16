<?php

namespace ArthurYdalgo\Laravext;

use Illuminate\Support\ServiceProvider;

class LaravextServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     *@return void
     */
    public function boot()
    {
    }
    /**
     * Register the application services.
     *
     *@return void
     */
    public function register()
    {
        $this->app->singleton(Laravext::class, function () {
            return new Laravext();
        });
        $this->app->alias(Laravext::class, 'laravext');
    }
}
