<?php

namespace App\Http\Controllers;

use App\Http\Requests\CurrentUser\UpdateRequest;
use Illuminate\Http\Request;

class CurrentUserController extends Controller
{
    public function show(){
        return $this->successResponse(user());
    }

    public function store(UpdateRequest $request){
        $user = $request->user();

        $data = $request->validated();

        $avatar = $request->file('avatar')?->get();

        info([
            'isset' => isset($request->avatar),
            'avatar' => $avatar
        ]);

        if($avatar){
            $user->deleteAvatar();

            $avatar_media = $user->addMediaFromContent($avatar, path_suffix: 'avatar');

            $data['avatar_url'] = $avatar_media->url;
        }

        $user->update($data);
        
        return $this->successResponse($user);
    }
}
