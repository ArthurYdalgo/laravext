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
        
        return $this->successResponse($user);
    }

    public function login(Request $request){
        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {
            session()->regenerate();

            return auth()->user();
        }

        return $this->errorResponse('Invalid credentials', 401);
    }

    public function logout(Request $request){
        auth()->logout();

        session()->invalidate();

        session()->regenerateToken();

        return response()->noContent();
    }
}
