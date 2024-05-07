@extends('layouts.contact-us')
@section('content')
    @startNexus
    <div class="flex justify-center items-center min-h-[70vh]  mt-6">
        Contact Us at our email

            <a href="mailto:fake@email.com"
                class="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out mx-2">
                fake@email.com
            </a>
            <span>|</span>
            <a href="https://twitter.com" target="_blank"
                class="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out mx-2">
                Twitter
            </a>
            <span>|</span>
            <a href="https://facebook.com" target="_blank"
                class="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out mx-2">
                Facebook
            </a>
            <span>|</span>
            <a href="https://instagram.com" target="_blank"
                class="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out mx-2">
                Instagram
            </a>
        

    </div>
    @endNexus
@endsection
