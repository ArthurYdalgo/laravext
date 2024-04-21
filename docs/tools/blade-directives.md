# Blade Directives 

Laravext offers some blade directives to be used in your project.

## @nexus

The `@nexus` directive is used to define where the content of the `page.(jsx|tsx|vue)` files (an all the outer file conventions) will be rendered. Assuming you have a `./resources/views/layouts/app.blade.php` blade view (with a `@yield('content')` inside it), inside a `./resources/views/sections/app.blade.php` you should use the `@nexus` directive like this:

```blade
@extends('layouts.app')
@section('content')

    @nexus

@endsection
```

## @startNexus and @endNexus

As mentioned before in the [Concepts/Loading/Server Side](/concepts/file-conventions?id=server-side-blade-template) section of this documentation, you might need more complex server side skeletons to be rendered while the javascript is loaded, so you can use the `@startNexus` and `@endNexus` directives to define where the content of the `page.(jsx|tsx|vue)` files (an all the outer file conventions) will be rendered. Assuming you have a `./resources/views/layouts/app.blade.php` blade view (with a `@yield('content')` inside it), inside a `./resources/views/sections/app.blade.php` you should use the `@startNexus` and `@endNexus` directives like this:

```blade
@extends('layouts.app')
@section('content')
    @startNexus
        @auth
            <h1 class="text-xl font-bold text-gray-800 dark:text-gray-200">Welcome back,
                {{ auth()->user()->name }}</h1>
        @endauth
        @guest
            <h1 class="text-xl font-bold text-gray-800 dark:text-gray-200">Welcome, stranger</h1>
        @endguest
    @endNexus
@endsection
```

Once again... Remember that anything in between those two directives will be cleared when the content of the page component is loaded.

## @strand

You can use the @strand('Path/To/Component') directive alongside a @nexus, which will use the name as a path to find a React/Vue component inside the resources/js/strands (which is customizable).

```blade
@extends('layouts.app')
@section('content')

    @strand('PrivacyToggle')

    @nexus

@endsection
```

## Overview 

In the end, depending on how/which directives you use, your overall blade structure might look like one of these illustrations:

### @nexus
<a
href="/../images/illustrations/nexus-inside-section-inside-layout.jpg" target="_blank">
<img src="/../images/illustrations/nexus-inside-section-inside-layout.jpg" alt="image" style="width: 700px"/>
</a>

### @startNexus and @endNexus
<a
href="/../images/illustrations/start-and-end-nexus-inside-section-inside-layout.jpg" target="_blank">
<img src="/../images/illustrations/start-and-end-nexus-inside-section-inside-layout.jpg" alt="image" style="width: 700px"/>
</a>

Just a reminder that the view file can be customized not only in the config file, but also in a more granular way, as shown in the [Tools/Routing](/tools/routing) section.