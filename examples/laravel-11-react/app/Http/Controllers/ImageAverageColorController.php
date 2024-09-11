<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageAverageColorController extends Controller
{
    public function __invoke(Request $request){
        $image = $request->file('image');
        
        return $this->successResponse([
            'color' => getAverageColorFromImageBinary($image->get())
        ]);
    }
}
