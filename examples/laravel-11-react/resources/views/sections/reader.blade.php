@extends('layouts.reader')
@section('content')
    @startStrand('ReaderNavBar')
    <header class="bg-white dark:bg-gray-800 shadow">
        <div class="mx-auto py-4 px-6 sm:px-6 lg:px-[15%]">
            <div class="flex items-center justify-between space-x-4">
                <a href="/"
                    class="rounded-md px-3 py-2 border border-black hover:text-white hover:bg-black text-black ring-1 ring-transparent transition">
                    <h2 class="font-semibold text-lg leading-tight">
                        DevDiary
                    </h2>
                </a>

                <input type="text" placeholder="{{ __('Search') }}..."
                    class="w-full px-4 py-2 rounded-md border-gray-300  dark:text-gray-200 focus:outline-none  transition duration-300" />

                <div class="flex items-center space-x-4">

                    <a href="{{ route('login') }}"
                        class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                        {{ __('Login') }}
                    </a>
                    <a href="{{ route('register') }}"
                        class="rounded-md whitespace-nowrap font-bold text-blue-600 px-3 py-2 border border-blue-600 ring-1 ring-transparent transition hover:text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
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
@endsection
