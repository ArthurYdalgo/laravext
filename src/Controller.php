<?php

namespace ArthurYdalgo\Laravext;

use Illuminate\Http\Request;

class Controller
{
    public function __invoke(Request $request): Response
    {
        return Laravext::render(
            $request->route()->defaults['component'],
            $request->route()->defaults['props']
        );
    }
}
