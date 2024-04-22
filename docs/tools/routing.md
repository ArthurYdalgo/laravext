# Routing 

In order to declare routes in a project with Laravext, you'll have to use some of the methods provided by it. 

## Route::laravext(...)

This method is responsible for automagically declaring routes for the project based on the structure of your nexus directory (check [Configuration/Nexus Directory](/configuration.md?id=nexus-directory) for more details on how to change it, if needed), and can be used in the plain way in your `routes/web.php` file, like this:

```php
use Illuminate\Support\Facades\Route;

/**
 * This will automagically generate all the file-based routes of your application.
 * It's recomended that you use it at the top of your routes file, so you can use override it
 * with more complex route declarations, if needed.
 */
Route::laravext();
```

It does, however, accept some parameters so you can use it in a more customized way:

`Route::laravext($uri = null, $props = [], $route_group_attributes = [], $root_view = null)`

The parameters:
- `uri`: is used so you can define which urls will be matched to this route declaration. If nothing is set, then it'll apply to all the routes created by the Laravext router.
- `props`: is used to define the properties that will be passed to the component
- `route_group_attributes`: is used to define the attributes that will be passed to the route group, (such as `middleware`, `as`). In order to avoid conflicts with the automagically generate route segments, the `prefix` parameters that you'd usually use with a route group is not used
- `root_view`: is used to define the root view that will be used to render the component. This will override the default root view [defined in the configuration file](/configuration.md?id=root-view). If nothing is set, the default root view will be used.

Here's an example where any automagically generate route from this point forward (including the '/dashboard' route itself) will contain the defined props, and the defined route group attributes, such as middleware and name prefix, but the prefix will be ignored, unlike a common route group.

```php
use Illuminate\Support\Facades\Route;

// You can still use the default way of declaring routes before any complex route declaration
Route::laravext();

Route::laravext('dashboard', [
    'inspiring_quote' => 'You are the creator of your own destiny.',
], route_group_attributes: [

    // 'prefix' => 'dashboard', // the prefix key is unset internally, to avoid conflicts with the laravext router

    'middleware' => [
        'auth',
        'verified'
    ],

    'as' => 'admin.'
]);
```

As mentioned before, in the [Quickstart](/quickstart.md) section, this is technically optional, as there're other ways to generate your routes in a more granular way, but it's entirely up to you on how you want to use it. (Although I think that if you are using Laravext and came all the way here, you probably want to use it)

## Route::nexus(...)

Similar to [Inertia.js' Shorthand Routes](https://inertiajs.com/routing), you can manually set a route to a specific nexus component using the `Route::nexus` method. This method is useful when you want to create a route that doesn't follow the file-based route structure of Laravext, or when you want to pass specific props, set a specific file convention (see [FileConvention](/concepts/file-conventions) for more details), root view, etc.

`Route::nexus($uri = '{nexusSlug?}', $page = null, $props = [], $root_view = null, ...$parameters)`

The (named) parameters:
- `uri`: is used to define the url that will be matched to this route declaration. If nothing is set, then it'll apply to all the routes created by the Laravext router. Unlike the `Route::laravext` method, this parameter does not affect any subroute.
- `page`: is used to define the nexus component that will be rendered. If nothing is set, it'll use any previously `page` file convention that was detected for that path.
- `props`: is used to define the properties that will be passed to the component. This is useful when you need to do some server-side data fetching.
- `root_view`: is used to define the root view that will be used to render the component. This will override the default root view [defined in the configuration file](/configuration.md?id=root-view). If nothing is set, the default root view will be used.
- `parameters`: is a variadic parameter that can be used to pass one or more of the following parameters:
  - `merge_with_existing_route`: wether or not this nexus declaration will be merged to any automagically created route before it by a `Route::laravext()`. This is so that you don't have to redeclare every file convention for that route, and define only those that you want to to override. This defaults to true, but you can set it to false if you want to completely override the automagically generated route.
  - `middleware`: the path to the `middleware.(jsx|tsx|vue)` file that will be used to this route.
  - `layout`: the path to the `layout.(jsx|tsx|vue)` file that will be used to this route.
  - `loading`: the path to the `loading.(jsx|tsx|vue)` file that will be used to this route.
  - `error`: the path to the `error.(jsx|tsx|vue)` file that will be used to this route.
  - `server_skeleton`: the ⚠️**html content**⚠️ of a skeleton that will be server-side rendered. See [FileConvention/Server Side (Basic HTML)](/concepts/file-conventions?id=server-side-basic-html) for more details.

You can also chain methods such as `->middleware('auth')`, `->withoutMiddleware('verified')` or `->name('admin.dashboard')` to the route declaration, as you would with a common route declaration.

```php
use Illuminate\Support\Facades\Route;

Route::laravext();

Route::nexus('dashboard/settings')->middleware([
    'auth'
])->withoutMiddleware([
    'verified'
])->name('admin.dashboard.settings');
```

As mentioned before, you can override the page component, root view, other file conventions or pass props to it, like:

```php
use Illuminate\Support\Facades\Route;
use App\Models\Order;

Route::laravext();

Route::nexus('orders/{order}', props: [
    'order' => request()->route('order')
],layout: '(app)/layout.jsx')->middleware([
    'auth',
    'can:read,order' // assuming you have a policy for the Order model
])->withoutMiddleware([
    'verified'
])->name('admin.orders.order');
```

<sup>⚠️Important note⚠️: you'll need to use [Laravel's explicit binding](https://laravel.com/docs/11.x/routing#explicit-binding) so that `request()->route('order')` returns the model itself. As of today, the implicit binding isn't working (hopefully it'll change in the future)</sub>

Once again, this declaration will already know the page file conventions to use because it was already found before to this uri before. If you want to completely override the automagically generated route's file conventions, you can set the `merge_with_existing_route` parameter to `false`:

```php
use Illuminate\Support\Facades\Route;
use App\Models\Order;

Route::laravext(); 

// assuming a route for 'orders/{order}' was already created by the router
Route::nexus('orders/{order}', '(app)/orders/order/page.jsx', [
    'order' => request()->route('order')
], layout: '(app)/layout.jsx')->middleware([
    'auth',
    'can:read,order' // assuming you have a policy for the Order model
], merge_with_existing_route: false)->withoutMiddleware([
    'verified'
])->name('admin.orders.order');
```

<sup>Hint: there's no need to set a root view, as the default one will still be used, but you can override as well, if you want</sub>

On both previous examples, the `order` route param would be available in the `laravext` prop passed to the `page.(jsx|tsx|vue)` component, more specifically in the `laravext.route_params.order` key. Check [Concepts/Laravext Prop](/concepts/laravext-prop) for more details.