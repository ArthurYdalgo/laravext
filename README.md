# Laravext

## What is it Laravext?

Laravext is a set of tools aimed to assist the development of [Laravel](https://laravel.com/) applications. It's name is (just in case you didn't get it) a mix of Laravel and [Next.js](https://nextjs.org/), although not affiliated or endorsed by any of them.

## Why does it exist?

I wanted to get what I (personally) considered the best parts of [Inertia.js](https://inertiajs.com/) and Next.js, and put them together. I was going to make this inside a project of mine, but then I relized I could actually try to make a composer package out it to use it in other projects.

I don't claim that this is supposed to replace or be better then NextJS/Inertia, because I don't think I even have that kind of expertise, but this might be a good way for me to

1. Learn about how to build a composer package
2. Maybe provide a good tool for whoever think this might be usefull for them

## What does it do?

As mentioned before, Laravext takes a lot of inspiration in how Inertia.js and Next.js do things. 

Laravext offers a way to automagically create routes based on the file structure of the `resources/js/pages` (this location is customizable) directory, much like Next.js.

Using the follwing structure:
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

and inserting inside the `routes/web.php` the following:

```php
Route::laravext();
```

Automaically registers the following (GET|HEAD) routes:
- /dashboard
- /login
- /users
- /users/{user}
- /users/{user}/comments
- /users/{user}/comments/{comment}

A blade view (either the default one or a defined when the `Route::laravext()` is called and a `root_view` parameter is sent) is then rendered. This view must contain what is called a `@nexus` blade directive, where the react component will be rendered. There're other ways render a nexus that are covered in the documentation.

![image](https://github.com/ArthurYdalgo/laravext/blob/main/docs/images/rick-morty-blade-jquery-meme.png?raw=true)

<sup>__Credits: Rick and Morty - Adult Swim__<sub>

Well, "yes"... Moving on

Additionally, in case you have components that are common to multiple pages, such as navbars, you can use the `@strand('Path/To/NavBar')` directive alongside a `@nexus`, which will use the name as a path to find a react component inside the `resources/js/strands` (which is customizable). The previous example would load a `NavBar.jsx` inside the `resources/js/strands/Path/To` directory.

Here's an example to how you could use it in a `app.blade.php` file:

```blade
<x-guest-layout>

    @strand('NavBar')

    ...

    @nexus

</x-guest-layout>
```

## Legal Disclaimer

This project has no financial intent, and is meerly a Frankenstein of Inertia and NextJs. I fully disclose that it may contain code that is straight up ~~copied from~~ inspired by [inertia](https://github.com/inertiajs/inertia/) and [inertia-laravel](https://github.com/inertiajs/inertia-laravel) repos ~~, and changed to fit my needs~~.

Although I might create a website for documentations, I will never run any adds on it, unless one day both NextJs and Inertia companies allow me. I DO NOT want any donations. 

I'm not responsible for anything you do with this code. I might stop supporting this at any given time, so please be aware of that before using it for anything that might be too important to you.

This section is just so I don't get my ass sued by any of them.

## Final Thoughts

This is my first big projects aimed to be used by the community, and it's just a side project. This repo may contain flaws/bad choices (but who doesn't). Use it if you like, ignore it if you hate it.

PRs are welcome, but I may ignore them at my disclosure. 

But hey, this is open-source, so fork it and to whatever the hell you want with it.