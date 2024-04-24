<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'privacy'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'privacy' => 'boolean'
    ];

    protected $appends = [
        'first_name',
        'last_name',
    ];
    
    public function getFirstNameAttribute(): string
    {
        return explode(' ', $this->name)[0];
    }

    public function getLastNameAttribute(): string
    {
        $names = explode(' ', $this->name);

        return end($names);
    }
}
