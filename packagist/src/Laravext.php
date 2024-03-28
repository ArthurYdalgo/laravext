<?php

namespace Laravext;

use Illuminate\Support\Facades\Facade;

/**
 * @method static \Laravext\ResponseFactory nexus(string $component, array $props = [])
 * @method static \Laravext\ResponseFactory withProps(array $props)
 * @method static \Laravext\ResponseFactory withSharedProps(array $props)
 * @method static \Laravext\ResponseFactory withMiddleware(string $middleware)
 * @method static \Laravext\ResponseFactory withLayout(string $layout)
 * @method static \Laravext\ResponseFactory withLoading(string $loading)
 * @method static \Laravext\ResponseFactory withError(string $error)
 * @method static \Laravext\ResponseFactory rootView(string $root_view)
 * @method static \Laravext\ResponseFactory withQueryParams(array $query_params)
 * @method static \Laravext\ResponseFactory withRouteParams(array $route_params)
 * @method static \Laravext\ResponseFactory share(string|array|\Illuminate\Contracts\Support\Arrayable $key, mixed $value = null)
 * @method static array pageData()
 *
 * @see \Laravext\ResponseFactory
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
