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
    
    protected $fillable = [
        'abuse_reportable_id',
        'abuse_reportable_type',
        'user_id',
        'ip_address',
        'type',
        'message',
        'reply',
        'replied_at',
    ];

    protected $casts = [
        'replied_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function abuseReportable()
    {
        return $this->morphTo();
    }

}
