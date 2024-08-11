<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Parsedown;

class Comment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'comment_id',
        'article_id',
        'user_id',
        'content',
        'deleted_at',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function replies()
    {
        return $this->hasMany(Comment::class, 'comment_id');
    }

    public function article()
    {
        return $this->belongsTo(Article::class);
    }

    public function parent()
    {
        return $this->belongsTo(Comment::class, 'comment_id');
    }

    public function reactions()
    {
        return $this->morphMany(Reaction::class, 'reactionable');
    }

    public function abuseReports()
    {
        return $this->morphMany(AbuseReport::class, 'reportable');
    }

    // Getters and Setters
    public function getHtmlAttribute()
    {
        return $this->toHtml();
    }

    // Methods
    public function toHtml()
    {
        $parsedown = new Parsedown();

        return $parsedown->text($this->content);
    }
}
