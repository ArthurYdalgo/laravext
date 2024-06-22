<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AbuseReport extends Model
{
    use HasFactory;

    public static $available_types = [
        'spam',
        'hate_speech',
        'virus',
        'scam',
        'inappropriate',
        'immediate_danger',
    ];
}
