@extends('layouts.guest')
@section('content')
    @startNexus
    <div class="pre-wrap break-words">

        {!! $article->toHtml() !!}

    </div>
    @endNexus
@endsection
