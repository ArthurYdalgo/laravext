@extends('layouts.app')
@section('content')
    @strand('PrivacyToggle')
    <br/>
    # These is server side rendered
    <h1>Title: {{ $laravext['nexus']['props']['book']->title }}</h1>
    <p>Autor: {{ $laravext['nexus']['props']['book']->author?->name ?? '--' }}</p>
    <br>
    <p>Description: {{ $laravext['nexus']['props']['book']->description }}</p>

    <br>
    # These are client side rendered
    <br>
    @strand('Book/Chapters', ['book' => $laravext['nexus']['props']['book']])
    <br>
    @strand('Book/Comments', ['book' => $laravext['nexus']['props']['book']])
    <br>
    @strand('Author/Books', ['author' => $laravext['nexus']['props']['book']->author])
    
    {{-- In case you're rendering a blade though the view method directly (as mentioned in the /routes/web.php file), but still are using strands: --}}

    {{-- <h1>Title: {{ $book->title }}</h1>
    <p>Autor: {{ $book->author?->name ?? '--' }}</p>
    <br>
    <p>Description: {{ $book->description }}</p>
    <br>
    @strand('Book/Chapters', ['book' => $book])
    <br>
    @strand('Book/Comments', ['book' => $book])
    <br>
    @strand('Author/Books', ['author' => $book->author]) --}}

@endsection
