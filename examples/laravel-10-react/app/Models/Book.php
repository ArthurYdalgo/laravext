<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'author_id',
        'slug',
        'title',
        'description',
        'published_at'
    ];

    protected $casts = [
        'published_at' => 'date'
    ];

    public function author(){
        return $this->belongsTo(Author::class);
    }

    public function chapters(){
        return $this->hasMany(Chapter::class);
    }

    public function comments(){
        return $this->hasManyThrough(Comment::class, Chapter::class);
    }

}
