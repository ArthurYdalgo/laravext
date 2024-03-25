<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'chapter_id',
        'content',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function chapter(){
        return $this->belongsTo(Chapter::class);
    }

    public function book(){
        return $this->chapter->book();
    }

}
