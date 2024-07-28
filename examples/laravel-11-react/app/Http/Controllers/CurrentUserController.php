<?php

namespace App\Http\Controllers;

use App\Http\Requests\CurrentUser\UpdateRequest;
use Illuminate\Http\Request;

class CurrentUserController extends Controller
{
    public function show(){
        return $this->successResponse(user());
    }

    public function update(UpdateRequest $request){
        $user = $request->user();
        $user->update($request->validated());
        
        return $this->successResponse($user);
    }
}
