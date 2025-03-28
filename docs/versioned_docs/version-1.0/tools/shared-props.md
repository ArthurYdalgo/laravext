# Shared Props

Shared props are props that you might want to pass to every page in your application. They can be used to pass data that is common to all pages, such as the current user, the application's name, etc. This is done in a similar way to [Inertia.js' shared data](https://inertiajs.com/shared-data). In order to use shared props, for every route, you must create a middleware, such as the example below:

```php
namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Laravext\Middleware;

class HandleLaravextRequests extends Middleware
{
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'motivation' => 'You have bills to pay',
            'app_name' => 'My App With An Original Name',
        ]);
    }
}
```

and then include it in your `app/Http/Kernel.php` file:

```php
namespace App\Http;

use App\Http\Middleware\HandleLaravextRequests;
use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    protected $middleware = [
        // Other middlewares
    ];

    /**
     * The application's route middleware groups.
     *
     * @var array<string, array<int, class-string|string>>
     */
    protected $middlewareGroups = [
        'web' => [
            // Other middlewares

            HandleLaravextRequests::class,
        ],

        // Other middleware groups
    ]

    // Rest of the Kernel.php
}
```
<sub>These instructions are for "old" Laravel project structure. If you're using Laravel 11 (or later) with the new structure, check the [official documentation on how to register a middleware in the new way](https://laravel.com/docs/11.x/middleware#registering-middleware)</sub>

After this, you can access this data through the [Laravext prop](/docs/concepts/laravext-prop) in your pages.

Another way to set shared props is by using one of the methods below:

```php
namespace App\SomeNamespace;

use Laravext\Laravext;

// some code
Laravext::share('app_name', 'My App With An Original Name');
Laravext::share('motivation', 'You have bills to pay');

// or
Laravext::share([
    'app_name' => 'My App With An Original Name',
    'motivation' => 'You have bills to pay',
]);

// or
Laravext::withSharedProps([
    'app_name' => 'My App With An Original Name'
    'motivation' => 'You have bills to pay',
]);
```
