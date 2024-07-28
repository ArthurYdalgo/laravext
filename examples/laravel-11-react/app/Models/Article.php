<?php

namespace App\Models;

use FastVolt\Helper\Markdown;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Laravel\Scout\Searchable;
use Parsedown;

class Article extends Model
{
    // use Searchable;
    use HasFactory;

    protected $fillable = [
        'user_id',
        'short_link_code',
        'slug',
        'banner_url',
        'title',
        'subtitle',
        'content',
        'language',
        'reading_time',
        'keywords',
        'metadata',
        'published_at'
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'keywords' => 'array',
        'metadata' => 'array',
        'reading_time' => 'integer'
    ];

    protected $appends = [
        'html'
    ];

    // Getters and Setters
    public function getHtmlAttribute()
    {
        return $this->toHtml();
    }

    public function getUserHasBookmarkedAttribute()
    {
        $user = user();

        if (!$user) {
            return null;
        }

        return Cache::store("array")->remember("article:{$this->id}|user_{$user->id}_has_bookmarked", now()->addMinutes(5), function () use ($user) {
            return $user->hasBookmarked($this);
        });
    }

    public function getUserReactionsAttribute()
    {
        $user = user();

        if (!$user) {
            return null;
        }

        return Cache::store("array")->remember("article:{$this->id}|user_{$user->id}_reactions", now()->addMinutes(5), function () use ($user) {
            return $user->reactionsTo($this);
        });
    }

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function media()
    {
        return $this->belongsToMany(Media::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function shares()
    {
        return $this->hasMany(Share::class);
    }

    public function bookmarks()
    {
        return $this->belongsToMany(User::class, 'bookmarks');
    }

    public function reads()
    {
        return $this->hasMany(Read::class);
    }

    public function reactions()
    {
        return $this->morphMany(Reaction::class, 'reactionable');
    }

    public function abuseReports()
    {
        return $this->morphMany(AbuseReport::class, 'reportable');
    }

    // Scopes
    public function scopeWithGroupedReactions($query)
    {
        return $query->with(['reactions' => function ($query) {
            $query->select('reactionable_id', 'reaction', DB::raw('count(*) as count'))
                ->groupBy('reactionable_id', 'reaction')->orderBy('count', 'desc');
        }]);
    }

    public function scopeAvailable($query)
    {
        return $query->where(function ($query) {
            $query->published();

            if (user()) {
                $query->orWhere('articles.user_id', user()->id);
            }

            return $query;
        });
    }

    /**
     * This is a workaround to use Laravel Scout with Spatie Query Builder
     * 
     * @see: https://github.com/spatie/laravel-query-builder/issues/147#issuecomment-1362814997
     */
    public function scopeWhereScout($query, string $search)
    {
        if (!$search) {
            return $query;
        }

        $scout_is_available = scoutIsAvailable();

        if ($scout_is_available) {
            return $query->whereIn(
                'id',
                self::search($search, function ($meilisearch, $query, $options) {
                    $options['limit'] = 1000;

                    return $meilisearch->search($query, $options);
                })
                    ->get()
                    ->pluck('id'),
            );
        }

        $search = str_replace('\"', '', $search);

        return $query->where(function ($subquery) use ($search) {
            $subquery->where('articles.title', 'like', "%{$search}%")->orWhere('articles.subtitle', 'like', "%{$search}%")
                ->orWhereHas("user", function ($subsubquery) use ($search) {
                    $subsubquery->where('users.name', 'like', "{$search}%");
                })->orWhereHas("tags", function ($subsubquery) use ($search) {
                    $subsubquery->where('tags.slug', 'like', "$search");
                })->orWhereJsonContains('articles.keywords', $search);
        });
    }

    public function scopePublished($query, $date = null)
    {
        return $query->where(function ($query) use ($date) {
            return $query->whereNotNull('published_at')->where('published_at', '<=', $date ?? now());
        });
    }

    // Methods
    public function toHtml()
    {
        $parsedown = new Parsedown();

        return $parsedown->text($this->content);
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'content' => $this->content,
            'keywords' => implode(',', $this->keywords),
            'author_name' => $this->user->name,
            'author_username' => $this->user->username,
            'tags' => $this->tags->pluck('slug')->implode(','),
        ];
    }
}
