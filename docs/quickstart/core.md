## Composer <!-- {docsify-ignore} -->

This tutorial assumes you already have a Laravel project up and running, and that you use the vite bundler. These instructions are based on the [examples provided in the laravext repository](https://github.com/ArthurYdalgo/laravext/tree/main/examples).

## Installations <!-- {docsify-ignore} -->

First, install the composer package:

```bash
composer require arthurydalgo/laravext
```

you can also publish the config file to make changes such as default root view, nexus/strands directory, etc:

```bash
php artisan vendor:publish --tag=laravext-config
```

on your `./routes/web.php`, insert the following:

```php
Route::laravext();
```

It is recomended that you put it in the beggining of the file, so you can overwrite any created route to fit your needs. For more details, check the [router section](/router)

Then, you use one of the following commands to install the respective npm module for your current application, depending on whether you're using [React](/quickstart/react) or [Vue](/quickstart/vue).
