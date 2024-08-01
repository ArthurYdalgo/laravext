<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AbuseReport extends Model
{
    use HasFactory;

    public static $available_types = [
        'spam' => 'Spam',
        'hate_speech' => 'Hate Speech',
        'virus' => 'Virus',
        'scam' => 'Scam',
        'inappropriate' => 'Inappropriate',
    ];
    
    protected $fillable = [
        'reportable_id',
        'reportable_type',
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

    public function scopeType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeAbuseReportableIs($query, $model)
    {
        return $query->where('reportable_id', $model->id)
            ->where('reportable_type', $model->getMorphClass());
    }

    public function scopeReplied($query)
    {
        return $query->whereNotNull('replied_at');
    }

    public function scopeNotReplied($query)
    {
        return $query->whereNull('replied_at');
    }

}
