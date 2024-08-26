<div class="flex ">
    <div class="hidden sm:block sm:w-20 lg:w-20 px-1">
        <div class="flex flex-col space-y-2">
        </div>
    </div>
    <div class="lg:w-[65.5%] rounded-md bg-white mx-1 lg:mx-2">
        <p align="center"><img src="{{ $article->banner_url ?? '/images/covers/placeholder.png' }}"
                class="shadow-md w-full rounded-t-md" alt="{{ $article->title }}"></p>
        <div class="flex justify-start px-8 mt-4 space-x-2">
            <div class="flex items-center space-x-2"><a href="{{ route('user', ['user' => $article->user->username]) }}"
                    class=""><img src="{{ $article->user->avatar_url ?? '/images/avatars/placeholder.png' }}"
                        class="w-10 h-10 rounded-full" alt="{{ $article->user->name }}"></a></div>
            <div class="flex flex-col py-2"><span class="text-lg font-bold hover:underline"><a
                        href="{{ route('user', ['user' => $article->user->username]) }}"
                        class="">{{ $article->user->name }}</a></span><span
                    class="text-sm text-gray-500">{{ $article->published_at->isoFormat('LLL') }}
                    @if ($article->updated_at != $article->published_at)
                        <span class="text-xs text-gray-500"> - Updated
                            on {{ $article->updated_at->isoFormat('LLL') }}</span>
                    @endif
                </span></div>
        </div>
        <div class="flex items-center justify-center mb-2 px-8 pt-3">
            <div class="flex items-center mini-loader space-x-3">
            </div>
        </div>
        <div class="flex justify-start">
            <h1 class="px-8 text-[2.25rem] font-bold antialiased font-sans">{{ $article->title }}</h1>
        </div>
        <div class="flex justify-start px-8 space-x-2">
            @foreach ($article->tags as $tag)
                <span class="flex row hover:underline cursor-pointer">#{{ $tag->slug }}</span>
            @endforeach

        </div>
        <div class="article pre-wrap break-words ">
            <div class="article-div article-blade-div">
                {!! $article->html !!}
            </div>
        </div>
        <div class="px-4">
            <div class="border-b border-gray-200 w-full"></div>
        </div>
        <h3 class="px-4 mt-4 mb-2 font-semibold">Comentários ({{ $article->comments_count }})</h3>
        <div class="space-y-2 px-4 py-4" id="comments">


        </div>
    </div>
    <div class="hidden lg:block lg:w-[400px] px-3 space-y-2">
        <div class="flex flex-col space-y-2 border-t-[30px] bg-white shadow rounded-md p-4 pt-0 w-full"
            style="border-top-color: {{ $article->user->banner_hex_color ?? '#000000' }};">
            <div class="-mt-4 flex items-end"><a href="{{ route('user', ['user' => $article->user->username]) }}"
                    class=""><img src="{{ $article->user->avatar_url ?? '/images/avatars/placeholder.png' }}"
                        class="w-14 h-14 rounded-full border-2 border-white" alt="{{ $article->user->name }}"></a><span
                    class="text-lg font-semibold ml-1 mb-1"><a
                        href="{{ route('user', ['user' => $article->user->username]) }}"
                        class="hover:underline">{{ $article->user->name }}</a>
                    @if ($article->user->pronouns)
                        <span class="text-xs text-gray-500">({{ $article->user->pronouns }})</span>
                    @endif
                </span></div>
            <button type="button"
                class=" px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150 false flex items-center justify-center">
                ...
            </button>
            <div class="flex flex-col space-y-2 mt-2"><span
                    class="text-sm text-gray-500">{{ $article->user->biography }}</span>
                
            </div>
        </div>
        <div class="flex flex-col space-y-2 bg-white rounded-md shadow p-3 w-full">
            <h2 class="text-lg font-bold">{{ __('More from') }} <a
                    href="{{ route('user', ['user' => $article->user->username]) }}"
                    class="text-blue-500">{{ $article->user->name }}</a></h2>
            <div class="border-b border-gray-200 w-full"></div>
            <div class="flex flex-col space-y-2">
                @foreach ($latest_articles_from_user as $latest_article_from_user)
                    <div>
                        <div class="flex flex-col space-y-1"><a
                                href={{ route('user.article', ['user' => $latest_article_from_user->user->username, 'article' => $latest_article_from_user->slug]) }}
                                class="">
                                <h3 class="text-lg hover:underline">{{ $latest_article_from_user->title }}</h3>
                            </a><span
                                class="text-sm text-gray-500">{{ $latest_article_from_user->published_at->isoFormat('LL') }}</span>
                        </div>
                        @if (!$loop->last)
                            <div class="border-b border-gray-200 w-full mt-2"></div>
                        @endif
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</div>
