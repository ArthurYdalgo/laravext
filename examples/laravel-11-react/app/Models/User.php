<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
        'privacy',
        'locale'
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

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function media()
    {
        return $this->hasMany(Media::class);
    }	

    public function articles()
    {
        return $this->hasMany(Article::class);
    }



    public function addMediaFromUrl($url)
    {
        $content = file_get_contents($url);

        return $this->addMediaFromContent($content);
    }

    public function addMediaFromContent($content)
    {
        $hash = hash('sha256', $content);

        if($media = $this->media()->where('hash', $hash)->first()){
            return $media;
        }

        $uuid = str()->uuid()->toString();

        $extension = getMimeFromBinary($content, true);

        $date = date("Y/m/d");

        $path = "media/{$this->id}/{$date}/{$uuid}.{$extension}";
        $disk = env('MEDIA_DISK', 'public');

        Storage::disk($disk)->put($path, $content);
        $url = Storage::disk($disk)->url($path);

        return $this->media()->create(compact('disk', 'path', 'hash', 'url'));
    }
}
