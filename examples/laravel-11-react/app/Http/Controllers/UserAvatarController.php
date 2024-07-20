<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserAvatar\StoreRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserAvatarController extends Controller
{
    public function store(StoreRequest $request)
    {
        user()->deleteAvatar();

        $avatar = user()->addMediaFromContent($request->file('avatar'), path_suffix: 'avatar');

        user()->update([
            'avatar_url' => $avatar->url,
        ]);

        return $request->user();
    }

    public function destroy(Request $request)
    {
        user()->deleteAvatar();

        return response()->noContent();
    }
}
