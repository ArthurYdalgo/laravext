<?php

namespace App\Http\Controllers\Tools;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Parsedown;

class MarkdownPreviewController extends Controller
{
    public function __invoke(Request $request)
    {
        $parsedown = new Parsedown();

        $markdown = str($request->input('markdown'))
        // ->replace('\'', "\"")
        ->toString();

        $html = $parsedown->text($markdown);

        return compact('html');
    }
}
