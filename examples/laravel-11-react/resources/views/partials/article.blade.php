<p align='center'>
    <img src="{{ $article->banner_url }}" width="600px" alt="{{ $article->title }}" />
</p>
<h1>{{ $article->title }}</h1>
<div class="pre-wrap break-words">

    {!! $article->html !!}

</div>