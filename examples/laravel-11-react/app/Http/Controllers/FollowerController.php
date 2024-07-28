<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FollowerController extends Controller
{
    public function isFollowing(Request $request, $follower, $followee)
    {
        $entry = DB::table("follows")
            ->where("follower_id", $follower)
            ->where("followee_id", $followee)
            ->first();

        return $this->successResponse([
            "value" => $entry && is_null($entry->ended_at),
            'started_at' => $entry?->started_at,
            'ended_at' => $entry?->ended_at,
        ]);
    }

    public function isFollowedBy(Request $request, $followee, $follower)
    {
        $entry = DB::table("follows")
            ->where("follower_id", $follower)
            ->where("followee_id", $followee)
            ->first();

        return $this->successResponse([
            "value" => $entry && is_null($entry->ended_at),
            'started_at' => $entry?->started_at,
            'ended_at' => $entry?->ended_at,
        ]);
    }

    public function unfollow(Request $request, User $followee){
        $follower = user();

        $follower->unfollow($followee);

        return $this->isFollowing($request, $follower->id, $followee);
    }

    public function follow(Request $request, User $followee){
        $follower = user();

        $follower->follow($followee);

        return $this->isFollowing($request, $follower->id, $followee);
    }
}
