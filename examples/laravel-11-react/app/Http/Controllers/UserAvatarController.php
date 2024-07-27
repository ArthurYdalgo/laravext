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

        $content = $request->file('avatar');

        $banner_hex_color = getAverageColorFromImageBinary($content);

        $avatar = user()->addMediaFromContent($request->file('avatar'), path_suffix: 'avatar');

        user()->update([
            'banner_hex_color' => $banner_hex_color,
            'avatar_url' => $avatar->url,
        ]);

        return $this->successResponse(user());
    }

    public function destroy(Request $request)
    {
        user()->deleteAvatar();

        return response()->noContent();
    }
}
