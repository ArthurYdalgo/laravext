<?php

namespace App\Http\Controllers;

use App\Http\Requests\UploadImageRequest;
use Illuminate\Http\Request;

class UploadImageController extends Controller
{
    public function __invoke(UploadImageRequest $request)
    {
        $contents = $request->file('image')->get();

        $media = user()->addMediaFromContent($contents, path_suffix: 'articles');

        return $this->successResponse($media);
    }
}
