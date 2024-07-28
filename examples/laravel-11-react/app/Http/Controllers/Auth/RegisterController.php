<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function __invoke(Request $request)
    {
        $user_data = $request->validated();
        $user_data['password'] = Hash::make($user_data['password']);
        $user_data['username'] = str($user_data['name'])->slug('-')->append(str()->random(6));
        $user_data['banner_hex_color'] = '#'.dechex(rand(0x000000, 0xFFFFFF));

        $user = User::create($user_data);

        return $this->successResponse($user);
    }
}
