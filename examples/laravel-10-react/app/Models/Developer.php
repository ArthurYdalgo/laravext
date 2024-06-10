<?php

namespace App\Models;

use App\Enums\DeveloperRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Developer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'email', 'team_id', 'role', 'username'];

    protected $appends = [
        'role_label'
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function projects(){
        return $this->hasManyThrough(Project::class, Team::class);
    }

    public function getRoleLabelAttribute()
    {
        return DeveloperRole::case($this->role);
    }
}
