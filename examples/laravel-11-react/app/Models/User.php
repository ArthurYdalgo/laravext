<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use HasRoles;

    protected $fillable = [
        'name',
        'username',
        'email',
        'email_verified_at',
        'password',
        'theme',
        'privacy',
        'locale',
        'biography',
        'links',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'privacy' => 'boolean',
        'links' => 'array',
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

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
