<?php

namespace App\Http\Controllers;

use App\Http\Requests\CurrentUser\UpdateRequest;
use Illuminate\Http\Request;

class CurrentUserController extends Controller
{
    public function show(){
        return auth()->user();
    }

    public function update(UpdateRequest $request){
        $user = $request->user();
        $user->update($request->validated());
        
        return $user;
    }

    public function login(Request $request){
        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {
            $request->session()->regenerate();

            return auth()->user();
        }

        return response()->json([
            'message' => __('auth.failed')
        ], 422);
    }

    public function logout(Request $request){
        auth()->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
