# Nexus Response

Similar to [Inertia.js' Responses](https://inertiajs.com/responses), the nexus response is a way render a view containing a `@nexus` blade directive (or `@startNexus/@endNexus`). Here's an example of how to use it (for the sake of simplicity, I won't use a controller):

`Laravext::nexus($page = null, $props = [])`

```php
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

You might have noticed the `rootView` chained method. This method is used to define the view that will be rendered. If you don't define it, the default view set in the configuration file will be used. The `render` method will render the view with the props you've defined. Other chainable methods are explained below, after the next topic.

## No need to repeat yourself

Let's say that there's a  `Route::laravext()` in the beginning of your `web.php` route file and there is a page convention in a path that creates a `/our-teams` route, and you declared a `Route::get('our-teams')` route after that. You don't need to specify the path to the page parameter in the `nexus` method, because it knows which page convention was used that created that uri, so you can just send the `props: [...]`, like so: 

```php
use App\Models\Team;
use Illuminate\Support\Facades\Route;

Route::laravext();

Route::get('our-teams', function () {
    $teams = Team::all();

    return nexus(props: compact('teams'))->render();
})->name('our-teams');
```

Sure, you can specify the path to the page parameter if you want to, or if you want to use another file to be used as the page convention.

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

## withHtmlSkeleton($html_skeleton)

This method is used to define the html skeleton that will be used to render the view. It can be used in place of the `html_skeleton` parameter. It'll override any previously defined html skeleton from the router.

```php
use App\Models\Article;
use Illuminate\Support\Facades\Route;

Route::get('', function () {
    $articles = Article::latest()->paginate(10);

    $server_skeleton = view('partials.articles', compact('articles'))->render();

    return nexus()
    ->withHtmlSkeleton($server_skeleton)
    ->render();

})->name('home');

```

## withViewSkeleton($view, $props = [])

Similar to the `withHtmlSkeleton` method, this method is used to define the view that will be used to render the html skeleton. You pass the view which will be used (follow the same `"path.to.view"` convention from Laravel) and any props you need. Props sent to the nexus or previously set as shared data will be available in this view by default (unless you override them by setting props with the same name as previously defined ones).

```php
use App\Models\Article;
use Illuminate\Support\Facades\Route;

Route::get('{article:slug}', function (Article $article) {

    $article->append(['user_has_bookmarked', 'user_reactions']);

    return nexus(props: compact('article')) // this prop will be available in the 'partials.article' view mentioned below
        ->withViewSkeleton('partials.article', [
            'other' => 'props' // just an example
            'you_might' => 'need'
        ]) // the $article variable will be available in the view by default
        ->withHeadTitle($article->title)
        ->render();

})->name('article');

```

## withHead(string|int|array $name, $value = null)

This method is used to define the head data that will be passed to the view. It can be used as a `$head` variable inside the view files. You can send it as either an array or pass a string as the name of the attribute and the value as the second parameter.

```php
return nexus(props: compact('books'))

    ->withHead('og_image', 'https://example.com/example_og_image.jpg')
    ->withHead('og_description', 'This is an example for the og:description meta tag')
    // or
    ->withHead([
        'og_image' => 'https://example.com/example_og_image.jpg',
        'og_description' => 'This is an example for the og:description meta tag'
    ])
    ->render();
```

### withHeadTitle($title) and withHeadDescription($description)

These methods are shortcuts for the `withHead` method. They are used to define the title and description of the page, respectively.

```php
return nexus(props: compact('books'))
    ->withHeadTitle('Books')
    ->withHeadDescription('A list of books')
    ->render();
```

they will be available in the view as inside a `$head` variable, like so:

```php

<title>{{ @$head['title'] ?? config('app.name', 'Laravel') }}</title>
<meta name="description" content="{{ @$head['description'] ?? 'Default description' }}">
<meta property="og:description" content="{{ @$head['og_description'] ?? 'Default og:description' }}">
<meta property="og:image" content="{{ @$head['og_image'] ?? 'https://example.com/default_og_image.jpg' }}">

```

These are completely optional, and you may or not use them as you see fit. Remember to not send a variable named `head` in the props, as it will override the head data set via these methods, if you're using them.


## File Conventions

You can also use [file conventions](/concepts/file-conventions) for the view that will be rendered. You can do so by using one of the following methods, passing the `path/to/the/convention/you/want/to/use/convention.(jsx|tsx|js|ts|vue)`.

- `withLayout($layout)`
- `withMiddleware($middleware)`
- `withError($error)`

## Macros

You can also create your own macros for the nexus response if you want to chain a custom method you might use a lot, like setting a head parameter. You can add it in you `App\Providers\AppServiceProvider` (or create a new service provider for it, it's your call) like so:

```php
<?php

namespace App\Providers;

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
        // The ResponseFactory accepts macros, so you can add your own methods to it and chain them
        // before rendering the response.
        ResponseFactory::macro('withHeadOgImage', function ($og_image) {
            return $this->withHead(compact('og_image'));
            // or 
            // return $this->withHead('og_image', $og_image);
        });
    }
}
```

now you can use it like so:

```php
return nexus(props: compact('books'))
    ->withHeadOgImage('https://example.com/og_image.jpg')
    ->render();
```