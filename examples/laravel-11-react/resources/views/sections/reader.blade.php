@extends('layouts.reader')
@section('content')
    <div>
        <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
            @startStrand('ReaderNavBar')
            <header class="bg-white dark:bg-gray-800 shadow">
                <div class="mx-auto py-[7px] px-6 sm:px-6 lg:px-[15%]">
                    <div class="flex items-center justify-between space-x-4">
                        <a href="/"
                            class=" rounded-[4px] px-3 py-1.5 border border-black hover:text-white hover:bg-black text-black ring-1 ring-transparent transition">
                            <h2 class="font-semibold whitespace-nowrap text-lg leading-tight">
                                Dev Diary
                            </h2>
                        </a>

                        <div class="relative w-full">
                            <a href="https://laravel-11-react.test/search?q="
                                class="absolute p-0.5 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs "><svg
                                    aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass"
                                    class="svg-inline--fa fa-magnifying-glass fa-lg m-2 ml-3 w-[15px] -translate-y-[1px]" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor"
                                        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z">
                                    </path>
                                </svg></a>
                                <input type="text" placeholder="Buscar..." class="w-full md:pr-36 pl-10 py-1.5 rounded-md border border-gray-300 transition duration-300 focus:outline-none" value="">
                                <span class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none text-xs md:block hidden">Powered by Meilisearch</span>
                        </div>

                        <div class="flex items-center space-x-4">

                            <a href="{{ route('login') }}"
                                class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                                {{ __('Login') }}
                            </a>
                            <a href="{{ route('register') }}"
                                class="rounded-md whitespace-nowrap font-bold w-auto text-blue-600 px-3 py-2 border border-blue-600 ring-1 ring-transparent transition hover:text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                                {{ __('Register') }}
                            </a>
                        </div>
                    </div>
                </div>
            </header>
            @endStrand
            <div class="mx-auto py-6 px-6 sm:px-6 lg:px-[15%]">
                @nexus
            </div>
        </div>
    </div>
@endsection
