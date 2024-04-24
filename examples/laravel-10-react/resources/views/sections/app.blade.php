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
    @nexus
@endsection
