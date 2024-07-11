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
                            <input type="text" placeholder="{{ __('Search') }}..."
                                class="w-full pr-36 pl-4 py-1.5 rounded-md border border-gray-300 transition duration-300 focus:outline-none" />
                            <span
                                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none text-xs">
                                Powered by Meilisearch
                            </span>
                        </div>

                        <div class="flex items-center space-x-4">

                            <a href="{{ route('login') }}"
                                class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                                {{__('Login')}}
                            </a>
                            <a href="{{ route('register') }}"
                                class="rounded-md whitespace-nowrap font-bold w-auto text-blue-600 px-3 py-2 border border-blue-600 ring-1 ring-transparent transition hover:text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                                {{__('Register')}}
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
