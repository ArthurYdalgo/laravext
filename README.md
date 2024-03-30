# Laravext

## What is it Laravext?

Laravext is a set of tools aimed to assist the development of [Laravel](https://laravel.com/) applications. It's name is (just in case you didn't get it) a mix of Laravel and [Next.js](https://nextjs.org/), although not affiliated or endorsed by any of them. I tried to fit in something that also sounded like "Vue" or "Inertia" in the name, but "Laravext" sounded the better, of all the options I thought of.

You may think of it as a (way more) simplified version of [Inertia.js](https://inertiajs.com/), with Next.js's file based router, and something similar to [Blade Components](https://laravel.com/docs/11.x/blade#components) that is actually a [React](https://react.dev/)/[Vue](https://vuejs.org/) component.

![image](https://github.com/ArthurYdalgo/laravext/blob/main/docs/images/rick-morty-blade-jquery-meme.jpg?raw=true)

<sup>**Credits: Rick and Morty - Adult Swim**<sub>

Well, yes... Moving on.

### What is it not?

It's not a server-side renderer of any React/Vue component, as it'd require some kind of javascript engine for it, and I wanted simplicity. It's not an (out-of-the-box) SPA like Inertia, as for every new page you want to load, a new visit will be made... that being said, nothing stops you from using a traditional react router insde the `@nexus` directive (explained later), although I think that would look a bit peculiar, and would defeat the purpose of having the automatic file-based router. But hey, you do you.

### In case you want to help me...

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/arthurydalgo)

## Why does it exist?

First things first: I don't claim that this is supposed to replace or be better then Next.js/Inertia.js, as each project may have different kind of needs and each team might have their preference, and maybe just using blade files with [Laravel Folio](https://laravel.com/docs/10.x/folio) to automagically create routes from them could be enough for you, or maybe the [TALL](https://tallstack.dev/) stack is the right choice for you.

I wanted to get what I (personally) considered the best parts of Inertia.js and Next.js, and put them together. This was going to be inside a project of mine, but then I realized I could actually try to make a package for other people to use, and I would try to learn something along the way about how to build composer and npm packages.

Additionally, you might be asking yourself:

"Why don't you use Next.js?", or even "Why don't you use Inertia.js?"

![image](https://github.com/ArthurYdalgo/laravext/blob/main/docs/images/i-dont-like-nextjs-mard-crowd-with-forks-meme.jpg?raw=true)

Before somebody light up their torches or grab their forks: the following points are my opinion only, based on my personal (in)experiences and troubles, you may disagree with them, and that's fine. Feel free to skip this section.

Inertia.js offers server-side rendering of React/Vue pages, but it requires that you keep a `php artisan inertia:start-ssr` artisan command running through supervisor or something similar, which may not be available in a shared environments. You also don't have a file-based routing system like the one Next.js offers.

Next.js offers server-side rendering of React components, and a great routing system, but I (personally) don't like their caching strategy, and for my use cases there was the need to slap a `"use client"` for nearly all pages. I felt a really degraded developer experience while using it, so for me became a no-no.

## What does it do?

As mentioned before, Laravext takes a lot of inspiration in how Inertia.js and Next.js do things.

Laravext offers a way to automagically create routes based on the file structure of the `resources/js/pages` (this location is customizable) directory, much like Next.js.

Using the following structure:

```
# In a Laravel project
- resources/js/pages
  - dashboard.jsx
  - login.jsx
  - users.jsx
  - users/
    - {user}.jsx
    - {user}/
      - comments.jsx
      - comments/
        - {comment}.jsx
```

and inserting the following inside the `routes/web.php`:

```php
Route::laravext();
```

Automagically registers the following (GET|HEAD) routes:

- /dashboard
- /login
- /users
- /users/{user}
- /users/{user}/comments
- /users/{user}/comments/{comment}

A blade view (either the default one set in the config or specified one when the `Route::laravext()` is called and a `root_view` parameter is sent) is then rendered by blade template engine. This view must contain what is called a `@nexus` blade directive, where the react component will be rendered. There're other ways render a nexus that are covered in the documentation.



Additionally, in case you have components that are common to multiple pages, such as navbars, you can use the `@strand('Path/To/NavBar')` directive alongside a `@nexus`, which will use the name as a path to find a react component inside the `resources/js/strands` (which is customizable). The previous example would load a `NavBar.jsx` from the `resources/js/strands/Path/To` directory.

Here's an example to how you could use it in a `app.blade.php` file:

```blade
<x-guest-layout>

    @strand('NavBar')

    ...

    @nexus

</x-guest-layout>
```

## Legal Disclaimer

This project has no financial intent, and is meerly a Frankenstein of Inertia.js and Next.js. I fully disclose that it may contain code that is straight up ~~copied from~~ inspired by the [inertia](https://github.com/inertiajs/inertia/) and [inertia-laravel](https://github.com/inertiajs/inertia-laravel) repos ~~, and changed to fit my needs~~.

I'm not responsible for anything you do with this code. I might stop supporting this at any given time, so please be aware of that before using it for anything that might be too important to you.

This section is just so I don't get my ass sued by anyone.

## Final Thoughts

This is my first "big" project aimed to be used by the community, and it's just a side project. This repo may contain flaws/bad choices (but who doesn't), or code that may cringe the hell out of you. Use it if you like, ignore it if you hate it.

PRs are welcome, but I may ignore them at my disclosure.

But hey, this is open-source, so you have my blessing (not that you need it anyway) to fork it and to whatever the hell you want with it.
