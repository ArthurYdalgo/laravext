<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Team extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name'];

    public function developers()
    {
        return $this->hasMany(Developer::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
