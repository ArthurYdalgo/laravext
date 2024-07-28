<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function __invoke(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {
            session()->regenerate();

            return $this->successResponse(user());
        }

        return $this->errorResponse('Invalid credentials', 401);
    }
}
