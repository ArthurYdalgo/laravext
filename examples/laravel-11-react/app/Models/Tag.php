<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'articles_count',
    ];

    protected $casts = [
        'articles_count' => 'integer',
    ];

    public function articles()
    {
        return $this->belongsToMany(Article::class);
    }

    public function updateArticlesCount()
    {
        $this->update([
            'articles_count' => $this->articles()->count(),
        ]);

        return $this;
    }
}
