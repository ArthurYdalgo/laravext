<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class={{ auth()->user()?->theme ?? 'light' }}>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ @$head['title'] ?? config('app.name', 'Laravel') }}</title>
    <meta name="description" content="{{ @$head['description'] ?? config('app.description') }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    @vite(['resources/css/app.css'])
</head>

<body class="font-sans antialiased" style="margin-right: 0px !important">
    @yield('content')
    <footer class="py-6 text-center text-sm text-black dark:text-white/70">
        <span>Powered by <a href="https://laravel.com" class="text-blue-500" target="_blank">Laravel
                {{ Illuminate\Foundation\Application::VERSION }} </a> and <a href="https://laravext.dev"
                class="text-blue-500" target="_blank">Laravext</a></span>
        <br>
        <div class="flex flex-row justify-center items-center space-x-2">
        Made with ❤️ and 🥤 in <img src='/images/flags/br.svg' class="ml-2 h-4" />
        </div>
        <span><a href="{{ route('about-this-project') }}" class="text-blue-500"
                target="_blank">{{ __('About this project') }}</a></span>
    </footer>
    @routes
    @laravextScripts
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
</body>

</html>
