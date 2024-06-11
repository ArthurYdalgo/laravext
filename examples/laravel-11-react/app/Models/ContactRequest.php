<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactRequest extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'replier_id',
        'name',
        'email',
        'message',
        'subject',
        'reply',
        'replied_at',
        'delivered_at',
        'deleted_at',
    ];

    protected $casts = [
        'replied_at' => 'datetime',
        'delivered_at' => 'datetime',
    ];

    public function replier()
    {
        return $this->belongsTo(User::class, 'replier_id');
    }
}
