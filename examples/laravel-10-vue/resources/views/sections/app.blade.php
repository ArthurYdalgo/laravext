@extends('layouts.app')
@section('content')
    @auth
        <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-200">Welcome back, {{ auth()->user()->name }}</h1>
        @strand('PrivacyToggle', ['initialState' => auth()->user()?->privacy])
    @endauth
    @guest
        <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-200">Welcome to our website</h1>
    @endguest
    <br>
    <h2>Basic Nexus</h2>
    @nexus

    <br><br>
    <h2>Nexus with children</h2>
    @startNexus
        @auth
            <h1 class="text-xl font-bold text-gray-800 dark:text-gray-200">More Complex Server Side Render,
                {{ auth()->user()->name }}</h1>
        @endauth
        @guest
            <h1 class="text-xl font-bold text-gray-800 dark:text-gray-200">Complex Server Side render for a guest</h1>
        @endguest
    @endNexus
@endsection
