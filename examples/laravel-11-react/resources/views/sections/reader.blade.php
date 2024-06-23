@extends('layouts.reader')
@section('content')
    <div>
        <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
            @strand('ReaderNavBar')
            <div class="mx-auto py-6 px-6 sm:px-6 lg:px-[15%]">
                @nexus
            </div>
        </div>
    </div>
@endsection
