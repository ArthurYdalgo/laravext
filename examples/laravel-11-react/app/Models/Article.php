<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'short_link_code',
        'slug',
        'title',
        'banner_url',
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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function shares()
    {
        return $this->hasMany(Share::class);
    }

    public function media()
    {
        return $this->belongsToMany(Media::class);
    }

    public function reads()
    {
        return $this->hasMany(Read::class);
    }
}
