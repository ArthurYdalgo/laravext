

<p align="center">
<a href="https://laravext.dev" target="_blank">
  <img width="150" src="https://github.com/ArthurYdalgo/laravext/blob/main/docs/static/images/logo/laravext.png?raw=true"/></a>
</p>

<p align="center">
<a href="https://packagist.org/packages/arthurydalgo/laravext"><img src="https://img.shields.io/packagist/dt/arthurydalgo/laravext" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/arthurydalgo/laravext"><img src="https://img.shields.io/packagist/v/arthurydalgo/laravext" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/arthurydalgo/laravext"><img src="https://img.shields.io/packagist/l/arthurydalgo/laravext" alt="License"></a>

</p>

# Laravext

Welcome to the Laravext repo!

Here are some useful links:
- [Documentation](https://laravext.dev)
- [Packagist](https://packagist.org/packages/arthurydalgo/laravext)
- [Packagist Repo](https://github.com/ArthurYdalgo/laravext-packagist)
- [NPM @laravext/vue3](https://www.npmjs.com/package/@laravext/vue3)
- [NPM @laravext/react](https://www.npmjs.com/package/@laravext/react)
- [Youtube](https://www.youtube.com/@laravext)
- [Discord](https://dsc.gg/laravext)

## Documentation

The documentation is available at [laravext.dev](https://laravext.dev). It's a constant work in progress, and I'm trying to make it as complete as possible in a way that makes it as useful and friendly like the [Laravel](https://laravel.com/) docs. If you find any errors, or have any suggestions, feel free to open an issue or a PR.

## Installation

Because the installation process is a bit more complex than just running a `composer require` and a `npm install`, you must follow the [quickstart guide](https://laravext.dev/docs/quickstart) on how to install Laravext in your Laravel project. It's a bit long, but I hope it's clear enough.

## What is Laravext?

Laravext is a set of tools aimed to assist the development of Laravel applications with [React](https://react.dev/) or [Vue](https://vuejs.org/). Its name is (just in case you didn't get it) a mix of Laravel and [Next.js](https://nextjs.org/), although not affiliated or endorsed by any of them. I tried to fit in something that also sounded like "Vue" or "[Inertia.js](https://inertiajs.com/)" in the name, but "Laravext" sounded better, of all the options I thought of. Not that creative, I know. Sue me (just kidding, don't).

You may think of it as a Next.js' file based router inside your Laravel project. There're some methods that slightly remember Inertia.js as well. It offers 3 ways to dynamically create server-side rendered pages based on your needs so your application is SEO friendly, one of them in the Inertia.js style, and two of them in the Blade style.

![image](/docs/static/images/memes/rick-morty-blade-meme.jpg)

<sup>**Credits: Rick and Morty - Adult Swim**<sub>

Well, yes... Moving on.

### In case you want to help me...

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/arthurydalgo)

## Why does it exist?

First things first: I don't claim that this is supposed to replace or be better than Next.js/Inertia.js, as each project may have different kinds of needs, and its team might have its preferences, and maybe just using blade files with [Laravel Folio](https://laravel.com/docs/11.x/folio) to automagically create routes from them could be enough for you, or maybe you'll be better off with the [TALL](https://tallstack.dev/) stack, or perhaps [Nuxt.js](https://nuxtjs.org/). In the end, it's your choice.

I wanted to get what I (personally) considered the best parts of Inertia.js and Next.js, and put them together. This was going to be inside a project of mine, but then I realized I could actually try to make a package for other people (and myself) to use, and I would try to learn something along the way about how to build composer and npm packages.

Additionally, you might be asking yourself:

"Why don't you use Next.js?", or even "Why don't you use Inertia.js?"

![image](/docs/static/images/memes/i-dont-like-nextjs-mard-crowd-with-forks-meme.jpg)

Before somebody light up their torches or grab their forks: the following points are my opinions only, based on my personal (in)experiences and troubles. You may disagree with them, and that's fine. Feel free to skip this section.

Inertia.js doesn't have an out-of-the-box file-based routing system like the one Next.js offers. (To the best of my knowledge, at the time of writing). If you want to make it SEO friendly you need to have some kind of access to higher privileges so you can keep a `php artisan inertia:start-ssr` artisan command running through supervisor or something similar (and so does Laravext, but there's also another approach that you can easily use, if needed. Check the [Server Side Rendering](https://laravext.dev/docs/server-side-rendering) section of the docs for more information), which may not be available in a shared environment (which, although less common, is still a thing). Laravext offers, [along with the Inertia.js style](https://laravext.dev/docs/server-side-rendering#javascript-runtime), two [other ways](https://laravext.dev/docs/server-side-rendering#blade-engine-based) to create server-side rendered pages based on your SEO needs.

Next.js offers server-side rendering of React components, and a great routing system, but I (personally) don't like their caching strategy, and for my use cases there was the need to slap a `"use client"` for a lot of your pages. I felt a really degraded developer experience while using it, so for me it'd make sense to have a way of being 'use client' by default, and 'use server' when needed. I have other points about it, but I feel that the ["Why I Won't Use Next.js" article](https://www.epicweb.dev/why-i-wont-use-nextjs) from Kent C. Dodds summarizes most of what I mean way better than I could. It's a good reading if you're interested. 

But, once again, I don't want to trash talk Next.js, or Inertia or any other tool. You should use whatever makes you more productive and pays your bills, and in the end, quoting Kent:

"Whatever you use is probably fine.

Your tool choice matters much less than your skill at using the tool to accomplish your desired outcome (a great user experience)."

## Who is it for?

My take is that you might be interested in using Laravext if you fall into one or more of the following categories:
- you want to have a file-based routing system like Next.js (because you don't want to use react/vue router, or declare them all in your `web.php` file)
- you don't want to set up a separate project for your frontend (like Next.js or Nuxt.js)
- you want some kind of flexibility to sometimes have a partially server-side rendered page for SEO purposes (and don't want to use Inertia.js)
- you don't like the way Next.js handles their caching strategy
- you don't want to slap a `"use client"` in nearly every component you have in your app because it becomes cubersome

## Who is it **NOT** for?

I'll try to be as less biased as possible, but you might not be interested in using Laravext if you fall into one or more of the following categories:

- you have a simple static page that Next.js (or anything else) could handle just fine
- you don't like the idea of having a file-based routing system (or don't want to have to follow the page conventions)
- you don't want to risk using a new package that may not be as stable as you'd like, or runs the risk of being abandoned
- you want to keep your frontend and backend in separate projects
- you didn't like it (to each their own)

Remember, this is just my opinion, and you should use whatever suits your needs the best, and there're plenty of tools available for you to use, such as the aforementioned Next.js, Inertia.js, Nuxt.js, TALL stack, Blade Components with Folio, [Livewire](https://livewire.laravel.com/), etc.

## What does it do?

As mentioned before, Laravext takes a lot of inspiration in how Next.js does things.

Laravext offers a way to automagically create routes based on the file structure of the `resources/js/nexus` (this location is customizable) directory, much like Next.js.

Using the following structure (the example uses .jsx files, but you may also use it with .vue files):

```
# In a Laravel project
+ resources/js/nexus

  - page.jsx # your-domain.com/

  + catalog
    - page.jsx # /catalog
    + {slug}
      - page.jsx # /catalog/{slug}
  
  + cart
    - page.jsx # /cart
    + checkout
      - middleware.jsx
      - page.jsx # /cart/checkout
  
  + (guest)
    - middleware.jsx
    - layout.jsx
    + login
      - page.jsx # /login
    + register
      - page.jsx # /register
  
  + (auth)
    - middleware.jsx
    + (author)
      - layout.jsx
      - middleware.jsx
      + books
        - page.jsx # /books
        + create
          - page.jsx # /books/create
        + {book}
          - page.jsx # /books/{book}
          + edit
            - page.jsx # /books/{book}/edit
      + orders
        - page.jsx # /orders
        + {order}
          - page.jsx # /orders/{order}

    + (reader)
      - layout.jsx
      - middleware.jsx
      + library
        - page.jsx # /library
        + {slug}
          - page.jsx # /library/{slug}
    ...
    # The rest of your pages
```

and inserting the following inside the `routes/web.php`:

```php
Route::laravext();
```

automagically registers the routes of your application (the resulting URIs are displayed next to each page.jsx as example). [Next.js' file conventions](https://nextjs.org/docs/app/building-your-application/routing#file-conventions) can also be applied, such as middlewares, layouts, error, etc. You can have granular control in a Inertia-styled approach about what happens before a route is rendered, if needed (check the [Tools/Nexus Response](https://laravext.dev/docs/tools/nexus-response) documentation section for more details).

A blade view (either the default one set in the config or specified one when the `Route::laravext()` is called and a `root_view` parameter is sent) is then rendered by the blade template engine. This view must contain what is called a `@nexus` blade directive (which you can read about at [Tools/Blade Directives](https://laravext.dev/docs/tools/blade-directives)), where the react component will be rendered. There're other ways render a nexus that are covered in the docs, more specifically in the [Tools/Routing](https://laravext.dev/docs/tools/routing) and [Tools/Nexus Response](https://laravext.dev/docs/tools/nexus-response).

Additionally, in case you have components that are common to multiple pages, such as navbars, you can use the `@strand('Path/To/NavBar')` directive alongside a `@nexus`, which will use the name as a path to find a react component inside the `resources/js/strands` (which is customizable). The previous example would load a `NavBar.jsx` from the `resources/js/strands/Path/To` directory.

Here's an example to how you could use it in a `app.blade.php` file:

```php
<x-guest-layout>

    @strand('NavBar', ['some' => 'data'])

    ...

    @nexus

</x-guest-layout>
```

The NavBar component will be rendered and receive the props sent to it in the directive.

## Known Issues

### Deprecation Warning on Node 21+

If you intend to use a Inertia.js style of SSR, you might get a ```[DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.``` warning in your console because of JSDom, which is used to render the React/Vue components. You can read more details in this [JSDom issue #3613](https://github.com/jsdom/jsdom/issues/3613)

## Legal Disclaimer

This project has no financial intent, and is meerly a Frankenstein of Inertia.js and Next.js. I fully disclose that it may contain code that is straight up ~~copied from~~ inspired by the [inertiajs/inertia](https://github.com/inertiajs/inertia/), [inertiajs/inertia-laravel](https://github.com/inertiajs/inertia-laravel) and [laravel/folio](https://github.com/laravel/folio) repos ~~, and changed to fit my needs~~.

I'm not responsible for anything you do with this code. I might stop supporting this at any given time, so please be aware of that before using it for anything that might be too important to you.

This section is just so I don't get my ass sued by anyone.

## Final Thoughts

This is my first "big" project aimed to be used by the community, and it's just a side project. This repo may contain flaws/bad choices (but who doesn't), or code that may cringe the hell out of you. Use it if you like, ignore it if you hate it.

PRs are welcome, but I may ignore them at my disclosure.

But hey, this is open-source, so you have my blessing (not that you need it anyway) to fork it and to do whatever the hell you want with it.

### Side note

The domain [laravext.com](http://laravext.com) is just a redirect to [laravext.dev](https://laravext.dev)
