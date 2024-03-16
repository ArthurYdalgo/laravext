<?php

namespace ArthurYdalgo\Laravext;

use Illuminate\Support\Facades\Facade;

/**
 * @see \ArthurYdalgo\Laravext\Skeleton\SkeletonClass
 */
class LaravextFacade extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'laravext';
    }
}
