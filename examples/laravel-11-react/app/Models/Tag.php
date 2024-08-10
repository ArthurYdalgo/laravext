<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'slug',
        'articles_count',
    ];

    protected $hidden = [
        'pivot',
    ];

    public function articles()
    {
        return $this->belongsToMany(Article::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class);
    }

    public function users(){
        return $this->belongsToMany(User::class, 'user_tag');
    }

    public function updateArticlesCount()
    {
        $this->update([
            'articles_count' => $this->articles()->count(),
        ]);

        return $this;
    }
}
