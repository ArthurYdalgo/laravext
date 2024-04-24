<?php

use App\Models\Author;
use App\Models\Book;
use App\Models\Chapter;
use App\Models\User;
use Illuminate\Support\Facades\Http;

Route::put("auth/user/privacy", function(){
    $user = auth()->user();

    
    $user->update([
        'privacy' => boolval(request('privacy'))
    ]);

    info($user->privacy ? 'ativado' : 'desativado');

    return $user;
})->middleware('auth');
