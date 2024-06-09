@extends('layouts.guest')
@section('content')
    @startNexus
    <div class=" min-h-[70vh] flex justify-center mt-6">
        <div class="flex flex-col justify-center">
            <div class="flex justify-center mt-6">
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
        </div>
    </div>
    @endNexus
@endsection
