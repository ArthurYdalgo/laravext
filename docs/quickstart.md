# Quickstart <!-- {docsify-ignore} -->

This tutorial assumes that you already have a Laravel project up and running, and that you use the vite bundler. These instructions are based on the [examples provided in the laravext repository](https://github.com/ArthurYdalgo/laravext/tree/main/examples).

## Composer

First, install the composer package:

```bash
composer require arthurydalgo/laravext
```

you can also publish the config file to make changes such as default root view, nexus/strands directory, etc:

```bash
php artisan vendor:publish --tag=laravext-config
```

on your `./routes/web.php`, insert the following to automagically generate your routes:

```php
Route::laravext();
```

It is recomended that you put it in the beggining of the file, so you can overwrite any created route to fit your needs. For more details, check the [router section](/concepts/router).

This technically optional, as there're other ways to generate your routes in a more granular way (which you can check at [Tools/Routing](/tools/routing.md)), but it's entirely up to you on how you want to use it.

## NPM      

Install the npm module:

```bash
npm install @laravext/react
```

or

```bash
npm install @laravext/vue
```

This example also assumes that you have a `bootstrap.js` at `./resources/js` and an `app.css` in you `./resources/css` directory. You might or not have any need for those.

Now, make sure that you have an `app.js` in your `./resources/js` directory, with the following:

```javascript
import './bootstrap';
import '../css/app.css';

import { createLaravextApp, resolveComponent } from "@laravext/react"
// or
import { createLaravextApp, resolveComponent } from "@laravext/vue"

document.addEventListener('DOMContentLoaded', function() {
    createLaravextApp({
        nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
        strandsResolver: (name) => resolveComponent(`./strands/${name}`, import.meta.glob('./strands/**/*'))
    })
 }, false);
```

You can change the nexus and strands' locations if you want to. Make sure to change the nexus directory in the `./config/laravext.php` file. For more details on how the router works, check the [router section](/router).

## Blade

Assuming you have a `./resources/views/layouts/app.blade.php` file, where a section is inserted, you'll need to insert some blade directives in it.

```php
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Style -->
        @vite(['resources/css/app.css'])
    </head>
    <body class="font-sans text-gray-900 antialiased">
        <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <div class="w-full sm:max-w-[95%] mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg text-white">
                @yield('content')
            </div>
        </div>
        @laravextScripts  <!-- This will create a __laravext context variable -->> 
        @viteReactRefresh <!-- In case you're using React -->
        @vite(['resources/js/app.js'])
    </body>
</html>
```

then, assuming you have a `./resources/views/sections/app.blade.php` (or any other view that you're going to render a nexus):

```php
@extends('layouts.app')
@section('content')
    @nexus
@endsection
```

You're now ready to start creating your project using the laravext router