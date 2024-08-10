<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class={{ auth()->user()?->theme ?? 'light' }}>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap" rel="stylesheet">

    <!-- Scripts -->
    @vite(['resources/css/app.css'])
</head>

<body class="font-sans antialiased">
    @yield('content')
    @routes
    @laravextScripts
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
</body>

</html>
