<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisterController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user_data = $request->only('name', 'email');
        $user_data['password'] = Hash::make($request->password);
        $user_data['username'] = str($user_data['name'])->slug('-')->append(str()->random(6));
        $user_data['banner_hex_color'] = '#'.dechex(rand(0x000000, 0xFFFFFF));

        $user = User::create($user_data);

        Auth::login($user);

        return $this->successResponse($user);
    }
}
