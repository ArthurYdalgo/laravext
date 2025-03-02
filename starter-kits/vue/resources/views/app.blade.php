<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="{{ (request()->cookie('appearance') ?? $_COOKIE['appearance'] ?? 'light') === 'dark' ? 'dark' : ''}}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <title>{{ @$head['title'] ?? config('app.name', 'Laravel') }}</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        
        @vite(['resources/css/app.css'])
    </head>
    <body class="font-sans antialiased">
        @nexus
        @routes
        @laravextScripts
        @vite(['resources/js/app.ts'])
    </body>
</html>
