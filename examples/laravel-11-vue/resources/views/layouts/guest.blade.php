<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class={{ auth()->user()?->theme ?? 'light' }}>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @vite(['resources/css/app.css'])
</head>

<body class="font-sans antialiased">
    <div class="min-h-screen bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
        <div class=" flex flex-col items-center selection:bg-[#FF2D20] selection:text-white">
            <div class=" w-full px-6 lg:max-w-7xl">
                <header class="gap-2 py-6 ">
                    <nav class="-mx-3 flex flex-1 justify-end">
                        <a href='/'
                            class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                            {{__('Home')}}
                        </a>
                        <a href={{ route('our-projects') }}
                            class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                            {{__('Our Projects')}}
                        </a>
                        <a href={{ route('our-teams') }}
                            class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                            {{__('Our Teams')}}
                        </a>
                        <a href={{ route('contact-us') }}
                            class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                            {{__('Contact')}}
                        </a>

                        <span class="text-black/50 py-2 dark:text-white/50">|</span>

                        @auth
                            <a href={{ route('admin.dashboard') }}
                                class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                                Dashboard
                            </a>
                        @endauth

                        @guest
                            <a href={{ route('login') }}
                                class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                                {{__('Login')}}
                            </a>

                        @endguest

                    </nav>
                </header>

            </div>
        </div>

        <div class="px-16 min-h-[75vh]">
            @yield('content')
        </div>

        <footer class="py-6 text-center text-sm text-black dark:text-white/70">
            <span>Powered by <a href="https://laravel.com" class="text-blue-500" target="_blank">Laravel {{ Illuminate\Foundation\Application::VERSION}} </a> and <a
                    href="https://laravext.dev" class="text-blue-500" target="_blank">Laravext</a></span>
            <br>
            <div class="flex flex-row justify-center items-center space-x-2">
                Made with ❤️ and 🥤 in <img src='/images/flags/br.svg' class="ml-2 h-4" />
                </div>
        </footer>
    </div>

    @routes
    @laravextScripts
    @vite(['resources/js/app.js'])
</body>

</html>
