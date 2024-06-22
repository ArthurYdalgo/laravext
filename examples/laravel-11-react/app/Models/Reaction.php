<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reaction extends Model
{
    use HasFactory;

    public static $available_reactions = [
        '💖',
        '🦄',
        '🤯',
        '🙌',
        '🔥',
    ];

    protected $fillable = [
        'user_id',
        'reactionable_id',
        'reactionable_type',
        'reaction',
    ];

    public function reactionable()
    {
        return $this->morphTo();
    }

}
