# Nexus Response

Similar to [Inertia.js' Responses](https://inertiajs.com/responses), the nexus response is a way render a view containing a `@nexus` blade directive (or `@startNexus/@endNexus`). Here's an example of how to use it (for the sake of simplicity, I won't use a controller):

`Laravext::nexus($page = null, $props = [])`

```php
<?php

use Illuminate\Support\Facades\Route;
use Laravext\Laravext;

/**
 * The example below shows how you can use laravext in a traditional way, as a response to a route, much like you would with Inertia.js.
 */
Route::get('books', function($slug){
    // Some code that needs to be executed server side
    $books = Http::withHeaders([
        'Authorization' => 'some-token'
    ])->get('https://external-service.com/api/books')->json();

    // Using the Laravext facade...
    return Laravext::nexus('path/to/page.(jsx|tsx|js|ts|vue)', compact('books'))->rootView('books.display')->render();

    // or nexus helper function, you can render a view with the defined props
    return nexus('path/to/page.(jsx|tsx|js|ts|vue)' compact('books'))->rootView('books.display')->render();

})->name('books');
```

The nexus method 

You might have noticed the `rootView` chained method. This method is used to define the view that will be rendered. If you don't define it, the default view set in the configuration file will be used. The `render` method will render the view with the props you've defined.

Other methods that can be chained after the `nexus` method are:

## rootView($root_view)

You can use this to define which view will be rendered. If you don't define it, the default view set in the configuration file will be used.

## withRouteParams($params = [])

This method is used to define the route parameters that will be passed to the view. It'll be merged with any previously existing route parameters. This data will be available in the [laravext prop](/concepts/laravext-prop).

## withQueryParams($params = [])

This method is used to define the query parameters that will be passed to the view. It'll be merged with any previously existing query parameters. This data will be available in the [laravext prop](/concepts/laravext-prop).

## withProps($props = [])

This method is used to define the props that will be passed to the view. It can be used in place of the `props` parameter. It'll be merged with any previously defined props.

## withSharedProps($props = [])

This method is used to define the shared props that will be passed to the view. It'll be merged with any previously defined shared props. Check [Tools/Shared Props](/tools/shared-props) for more information.

## File Convention Overrides

You can also override the file conventions for the view that will be rendered. You can do so by using one of the following methods, passing the `path/to/the/convention/you/want/to/use/convention.(jsx|tsx|js|ts|vue)`, except for the `withSkeleton`, which receives the html content of the skeleton:

- `withLayout($layout)`
- `withMiddleware($middleware)`
- `withLoading($loading)`
- `withError($error)`
- `withServerSkeleton($server_skeleton)`

⚠️Once again, if you're using the withServerSkeleton, you must pass the html content of what you want to use as the server skeleton. Additionally if you're using a `@startNexus` and `@endNexus` in the blade that is being rendered (either the default one or a manually set) this will be ignored.⚠️