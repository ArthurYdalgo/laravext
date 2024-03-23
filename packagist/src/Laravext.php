<?php

namespace ArthurYdalgo\Laravext;

use Illuminate\Support\Facades\Facade;

/**
 * @method static void share(string|array|\Illuminate\Contracts\Support\Arrayable $key, mixed $value = null)
 * @method static array pageData()
 *
 * @see \Inertia\ResponseFactory
 */
class Laravext extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return ResponseFactory::class;
    }
}
