<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Developer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'email', 'team_id', 'role', 'username'];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function projects(){
        return $this->hasManyThrough(Project::class, Team::class);
    }
}
