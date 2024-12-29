<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TokenController extends Controller
{
    public function index(){
        return JsonResource::collection(auth()->user()->tokens()->paginate(20));
    }

    public function store(Request $request){
        return response()->json([
            'token' => auth()->user()->createToken($request->token_name ?? 'Token ' . str()->random(4) . ' ' . now()->format('Y-m-d H:i:s'))->plainTextToken
        ]);
    }

    public function destroy(Request $request, $token){
        auth()->user()->tokens()->where('id', $token)->delete();
        
        return response()->noContent();
    }
}
