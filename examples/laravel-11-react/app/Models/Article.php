<?php

namespace App\Models;

use FastVolt\Helper\Markdown;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Parsedown;

class Article extends Model
{
    use Searchable;
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
        'published_at'
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'keywords' => 'array',
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
        return user() ? user()->hasBookmarked($this) : null;
    }

    public function getUserReactionsAttribute()
    {
        return user() ? user()->reactionsTo($this) : null;
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

    public function media(){
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

    // Methods
    public function toHtml(){
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
