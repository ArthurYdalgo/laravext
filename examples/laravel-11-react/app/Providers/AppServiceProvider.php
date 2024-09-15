<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;
use Laravext\ResponseFactory;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });

        // The ResponseFactory accepts macros, so you can add your own methods to it and chain them
        // before rendering the response.
        // ResponseFactory::macro('withHeadOgImage', function ($og_image) {
        //     return $this->withHead(compact('og_image'));
        //     or 
        //     return $this->withHead('og_image', $og_image);
        // });
    }
}
