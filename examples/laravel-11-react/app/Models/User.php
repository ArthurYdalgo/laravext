<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
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
        'education',
        'work',
        'location',
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
        'assigned_roles',
    ];

    // Getters and Setters
    public function getFirstNameAttribute(): string
    {
        return explode(' ', $this->name)[0];
    }

    public function getLastNameAttribute(): string
    {
        $names = explode(' ', $this->name);

        return end($names);
    }

    public function getAssignedRolesAttribute()
    {
        return $this->roles()->get()->pluck('name');
    }

    // Relationships
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

    public function reactions()
    {
        return $this->hasMany(Reaction::class);
    }

    public function followersRelationship()
    {
        return $this->belongsToMany(User::class, 'follows', 'followee_id', 'follower_id');
    }

    public function followers()
    {
        return $this->followers()->wherePivot('follows.ended_at', null);
    }

    public function followingRelationship()
    {
        return $this->belongsToMany(User::class, 'follows', 'follower_id', 'followee_id');
    }

    public function following()
    {
        return $this->following()->wherePivot('follows.ended_at', null);
    }

    public function bookmarkedArticles()
    {
        return $this->belongsToMany(Article::class, 'bookmarks');
    }

    // Methods
    public function addMediaFromUrl($url, $path_prefix = 'media')
    {
        $content = file_get_contents($url);

        return $this->addMediaFromContent($content);
    }

    public function addMediaFromContent($content, $path_prefix = 'media', $path_suffix = null)
    {
        $hash = hash('sha256', $content);

        if ($media = $this->media()->where('hash', $hash)->first()) {
            return $media;
        }

        $uuid = str()->uuid()->toString();

        $extension = getMimeFromBinary($content, true);

        $path = "{$path_prefix}/{$this->id}";

        if ($path_suffix) {
            $path .= "/{$path_suffix}";
        }

        $path .= "/{$uuid}.{$extension}";

        $disk = env('MEDIA_DISK', 'public');

        Storage::disk($disk)->put($path, $content);
        $url = Storage::disk($disk)->url($path);

        return $this->media()->create(compact('disk', 'path', 'hash', 'url'));
    }

    public function deleteAvatar()
    {
        $avatar = $this->avatar_url;

        if (!$avatar) {
            return false;
        }

        $media = $this->media()->where('url', $avatar)->first();

        if(!$media) {
            $this->update([
                'avatar_url' => null,
            ]);

            return false;
        }

        Storage::disk($media->disk)->delete($media->path);

        $this->update([
            'avatar_url' => null,
        ]);

        return true;
    }

    public function reactTo($reactionable, $reaction)
    {
        return $reactionable->reactions()->firstOrCreate([
            'user_id' => $this->id,
            'reaction' => $reaction,
        ], compact('reaction'));
    }

    public function unreactTo($reactionable, $reaction = null)
    {
        return $reactionable->reactions()
            ->where('user_id', $this->id)
            ->when($reaction, function ($query) use ($reaction) {
                return $query->where('reaction', $reaction);
            })
            ->delete();
    }

    public function reactionsTo($reactionable)
    {
        return $reactionable->reactions()->where('user_id', $this->id)->pluck('reaction');
    }

    public function isFollowing($user)
    {
        return $this->following()->where('followee_id', $user->id)->exists();
    }

    public function follow($user)
    {
        return $this->followingRelationship()->syncWithPivotValues($user, ['started_at' => now(), 'ended_at' => null]);
    }

    public function unfollow($user)
    {
        return $this->followingRelationship()->syncWithPivotValues($user, ['ended_at' => now()]);
    }

    public function bookmark($article)
    {
        return $this->bookmarkedArticles()->syncWithoutDetaching($article);
    }

    public function unbookmark($article)
    {
        return $this->bookmarkedArticles()->detach($article);
    }

    public function hasBookmarked($article)
    {
        return $this->bookmarkedArticles()->where('article_id', $article->id)->exists();
    }
}
