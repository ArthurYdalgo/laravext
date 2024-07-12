<p align='center'>
    <img src="{{ $article->banner_url }}" class="shadow-md max-w-[800px]" alt="{{ $article->title }}" />
</p>

<h1>{{ $article->title }}</h1>
<div class="article pre-wrap break-words">
    <div class="server-side-rendered-article">
        {!! $article->html !!}
    </div>

</div>
