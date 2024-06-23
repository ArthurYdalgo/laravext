@foreach ($articles as $article)
<div class="mb-4">
    <h2 class="text-2xl font-bold">
        <a href="{{ route('article', $article->slug) }}">{{ $article->title }}</a>
    </h2>
    <p class="text-gray-600">{{ $article->created_at->format('d M, Y') }}</p>
</div>
@endforeach