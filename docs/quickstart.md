# Quickstart Installation <!-- {docsify-ignore} -->

This tutorial assumes that you already have a Laravel 10 project up and running with PHP 8.2, and that you use the vite bundler. These instructions are based on the [examples provided in the laravext repository](https://github.com/ArthurYdalgo/laravext/tree/main/examples).

## Composer

First, install the composer package:

```bash
composer require arthurydalgo/laravext
```

you can also publish the config file to make changes such as default root view, nexus/strands directory, etc:

```bash
php artisan vendor:publish --tag=laravext-config
```

By default, the `root_view` is set as `sections.app`, which means you should either have that view file, or change the config to fit your needs.

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

# Additionally, you should have the following package installed, if you haven't already
npm install @vitejs/plugin-react
```


or

```bash
npm install @laravext/vue

# Additionally, you should have the following package installed, if you haven't already
npm install @vitejs/plugin-vue
```

This example also assumes that you have a `bootstrap.js` at `./resources/js` and an `app.css` in you `./resources/css` directory. You might or not have any need for those.

Now, make sure that you have an `app.(js|jsx|ts|tsx)` in your `./resources/js` directory, with the following:

<!-- tabs:start -->

#### **React**

`app.jsx`:


```jsx
import { createLaravextApp, resolveComponent, sharedProps } from "@laravext/react"
import './bootstrap';
import '../css/app.css';
import pt from './../../lang/pt.json'

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const user = sharedProps()?.auth?.user;

// This is just for example purposes, using i18n is not a requirement
i18n
    .use(initReactI18next)
    .init({
        resources: {
            pt: {
                translation: pt
            }
        },
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

i18n.changeLanguage(user?.locale || 'en')

document.addEventListener('DOMContentLoaded', function () {
    createLaravextApp({
        // Remember to change this path if you've modified the default path in the ./config/laravext.php file
        nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),

        // Remember to change this path if you're using another path to store your strands
        strandsResolver: (name) => resolveComponent(`./strands/${name}.jsx`, import.meta.glob('./strands/**/*.jsx')),

        // Like Inertia, there's a wrapper for the https://ricostacruz.com/nprogress library.
        // You don't have to declare this, while using the createLaravextApp, but so
        // you know, these are the default values:
        progress: {
            delay: 0, // How many miliseconds until the loading bar appears
            color: '#29d', // The color of said bar
            includeCSS: true, // Wether or not to use NProgress' default styling
            showSpinner: false, // Wether or not to show the spinner
        },

        // or, if you don't want it at all:
        // progress: false,

    })
}, false);
```

#### **Vue**

`app.js`:


```js
import './bootstrap';
import '../css/app.css';
import { createLaravextApp, sharedProps } from "@laravext/vue"
import { resolveComponent } from '@laravext/vue/tools';

// Other imports for the Vue.js example
import { createI18n } from 'vue-i18n'
import pt from './../../lang/pt.json'
import VueCookies from 'vue-cookies'

document.addEventListener('DOMContentLoaded', function() {
    createLaravextApp({
        // Remember to change this path if you've modified the default path in the ./config/laravext.php file
        nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),

        // Remember to change this path if you're using another path to store your strands
        strandsResolver: (name) => resolveComponent(`./strands/${name}.vue`, import.meta.glob('./strands/**/*.vue')),

        // If you're using Vue.js and you want to set the uses of your Vue app, you can do it here.
        uses: () => {
            const i18n = createI18n({
                legacy: false,
                locale: sharedProps()?.auth?.user?.locale || 'en',
                fallbackLocale: 'en',
                messages: {
                    pt
                }
            })

            return [
                { plugin: VueCookies, options: { expires: '7d' } },
                { plugin: i18n }
            ]
        },

        // Like Inertia, there's a wrapper for the https://ricostacruz.com/nprogress library.
        // You don't have to declare this, while using the createLaravextApp, but so
        // you know, these are the default values:
        progress: {
            delay: 0, // How many miliseconds until the loading bar appears
            color: '#29d', // The color of said bar
            includeCSS: true, // Wether or not to use NProgress' default styling
            showSpinner: false, // Wether or not to show the spinner
        },

        // or, if you don't want it at all:
        // progress: false,
    })
 }, false);
```

<!-- tabs:end -->

You can change the nexus and strands' locations if you want to. Make sure to change the nexus directory in the `./config/laravext.php` file. For more details on how the router works, check the [router section](/router).

## Vite Configuration

Make sure you have a vite.config.js that looks something like this (assuming you've already installed either [@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react) or [@vitejs/plugin-vue](https://www.npmjs.com/package/@vitejs/plugin-vue)). 

This example assumes you've defined a `VITE_APP_ENV` and `VITE_APP_DOMAIN` in your `.env` file, which contain the `APP_ENV` and `APP_DOMAIN` values, respectively. 

Change any configuration to fit your needs.

```javascript

import { defineConfig, loadEnv } from 'vite';
import laravel, { refreshPaths } from "laravel-vite-plugin";

// For React
import react from "@vitejs/plugin-react";

// For Vue
import vue from '@vitejs/plugin-vue';

export default function ({ mode }) {
    const env = loadEnv(mode, process.cwd());

    const host = env.VITE_APP_ENV == "local" ? env.VITE_APP_DOMAIN : undefined;

    return defineConfig({
        server: { host },
        plugins: [
            laravel({
                input: [
                    'resources/css/app.css',
                    'resources/js/app.js',
                ],
                refresh: [...refreshPaths, "resources/js/**", "app/**"],
            }),

            // For React
            react(),

            // For Vue
            vue({
                template: {
                    transformAssetUrls: {
                        base: null,
                        includeAbsolute: false,
                    },
                },
            }),
        ],
    })
};


```

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
        @laravextScripts  <!-- This will create a __laravext context variable -->
        @viteReactRefresh <!-- In case you're using React -->

        @vite(['resources/js/app.jsx']) <!-- In case you're using React -->
        @vite(['resources/js/app.js']) <!-- In case you're using Vue -->
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

## Nexus Directory

By default, the nexus directory is set as `./resources/js/nexus`. So this is where you should start placing the files that will be used by [Laravext's Router](/router). You may change this in the `./config/laravext.php` file, assuming you've published the config file.

You're now ready to start creating your project using the laravext router