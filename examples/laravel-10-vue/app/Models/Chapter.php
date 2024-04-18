<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Chapter extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'title',
        'content',
    ];

    public function book(){
        return $this->belongsTo(Book::class);
    }

    public function author(){
        return $this->book->author();
    }

    public function comments(){
        return $this->HasMany(Comment::class);
    }
}
