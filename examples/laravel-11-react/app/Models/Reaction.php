<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'reactable_id',
        'reactable_type',
        'user_id',
        'reaction',
    ];

    public function reactable()
    {
        return $this->morphTo();
    }
}
