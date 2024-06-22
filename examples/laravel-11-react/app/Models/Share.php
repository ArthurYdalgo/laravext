<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Share extends Model
{
    use HasFactory;

    public static $available_mediums = [
        'facebook',
        'twitter',
        'linkedin',
        'whatsapp',
        'email',
        'link',
    ];

    protected $fillable = [
        'article_id',
        'user_id',
        'code',
        'medium',
        'ip_address',
    ];

    public function article()
    {
        return $this->belongsTo(Article::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
