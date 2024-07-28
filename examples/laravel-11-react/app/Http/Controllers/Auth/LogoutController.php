<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function __invoke(Request $request)
    {
        auth()->logout();

        session()->invalidate();

        session()->regenerateToken();

        return response()->noContent();
    }
}
