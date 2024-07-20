@extends('layouts.reader')
@section('content')
    <div>
        <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
            @startStrand('ReaderNavBar')
            <header class="bg-white dark:bg-gray-800 shadow">
                <div class="mx-auto py-[7px] px-6 sm:px-6 lg:px-[15%]">
                    <div class="flex items-center justify-between space-x-4">
                        <a href="/"
                            class=" rounded-[4px] px-3 py-1.5 border-2 border-black hover:text-white hover:bg-black text-black ring-1 ring-transparent transition">
                            <h2 class="font-extrabold uppercase whitespace-nowrap text-lg leading-tight">
                                Dev Diary
                            </h2>
                        </a>

                        <div class="relative w-full">
                            <a href="https://laravel-11-react.test/search?q="
                                class="absolute p-0.5 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs "><svg
                                    aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass"
                                    class="svg-inline--fa fa-magnifying-glass fa-lg m-2 ml-3 w-[15px] -translate-y-[1px]"
                                    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor"
                                        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z">
                                    </path>
                                </svg></a>
                            <input type="text" placeholder="{{ __('Search') }}..."
                                class="w-full md:pr-36 pl-10 py-1.5 rounded-md border border-gray-300 transition duration-300 focus:outline-none"
                                value="">
                            <span
                                class="flex absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none text-xs ">Powered
                                by Meilisearch<img src="/images/logos/meilisearch.svg" class="w-6 ml-1" />
                            </span>
                        </div>

                        <div class="flex items-center space-x-4">
                            @auth
                                <a href="{{ route('new') }}"
                                    class="rounded-md whitespace-nowrap font-bold w-auto text-blue-600 px-3 py-2 border border-blue-600 ring-1 ring-transparent transition hover:text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                                    {{ __('Create Post') }}
                                </a>
                                <div class="ms-2 relative">
                                    <div class="relative">
                                        <div><span class="inline-flex rounded-md"><button type="button"
                                                    class="inline-flex items-center px-2 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"><img
                                                        src="{{user()?->avatar_url ?? '/images/avatars/placeholder.png' }}" alt="Developer"
                                                        class="w-16 rounded-full"><svg class="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                        fill="currentColor">
                                                        <path fill-rule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clip-rule="evenodd"></path>
                                                    </svg></button></span></div>
                                    </div>
                                </div>

                            @endauth
                            @guest
                                <a href="{{ route('login') }}"
                                    class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                                    {{ __('Login') }}
                                </a>
                                <a href="{{ route('register') }}"
                                    class="rounded-md whitespace-nowrap font-bold w-auto text-blue-600 px-3 py-2 border border-blue-600 ring-1 ring-transparent transition hover:text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                                    {{ __('Register') }}
                                </a>
                            @endguest

                        </div>
                    </div>
                </div>
            </header>
            @endStrand
            <div class="mx-auto py-6 pt-4 px-6 sm:px-6 lg:px-[15%]">
                @nexus
            </div>
        </div>
    </div>
@endsection
