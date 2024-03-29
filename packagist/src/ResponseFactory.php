<?php

namespace Laravext;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Facades\View;

class ResponseFactory
{
    public $props;
    public $root_view;
    public $query_params;
    public $route_params;
    public $shared_props;

    // Page Conventions
    public $middleware, $layout , $loading, $error, $page, $server_skeleton;
    
    public function __construct()
    {
        $this->props = [];
        $this->shared_props = [];
        $this->query_params = request()?->query();
        $this->route_params = request()?->route()?->parameters();
    }
    
    public function nexus($page = null, $props = [])
    {
        $this->page = $page;

        return $this->withProps($props);
    }

    public function share($key, $value = null): void
    {
        if (is_array($key)) {
            $this->withSharedProps($key);
        } elseif ($key instanceof Arrayable) {
            $this->withSharedProps($key->toArray());
        } else {
            $this->shared_props[$key] = $value;
        }
    }

    public function withProps($props = [])
    {
        $this->props = array_merge($this->props, $props);

        return $this;
    }

    public function withSharedProps($props = [])
    {
        $this->shared_props = array_merge($this->shared_props, $props);

        return $this;
    }

    public function withMiddleware($middleware)
    {
        $this->middleware = $middleware;

        return $this;
    }

    public function withLayout($layout)
    {
        $this->layout = $layout;

        return $this;
    }

    public function withLoading($loading)
    {
        $this->loading = $loading;

        return $this;
    }

    public function withError($error)
    {
        $this->error = $error;

        return $this;
    }

    public function withServerSkeleton($server_skeleton)
    {
        $this->server_skeleton = $server_skeleton;

        return $this;
    }

    public function withQueryParams($query_params = [])
    {
        $this->query_params = array_merge($this->query_params, $query_params);

        return $this;
    }

    public function withRouteParams($route_params = [])
    {
        $this->route_params = array_merge($this->route_params, $route_params);

        return $this;
    }

    public function rootView($root_view)
    {
        $this->root_view = $root_view;

        return $this;
    }

    public function pageData()
    {
        return [
            'nexus' => [
                'page' => $this->page,
                'props' => $this->props,
                'server_skeleton' => $this->server_skeleton,
                'middleware' => $this->middleware,
                'layout' => $this->layout,
                'loading' => $this->loading,
                'error' => $this->error,
            ],
            'shared_props' => $this->shared_props,
            'route_params' => $this->route_params,
            'query_params' => $this->query_params,
        ];
    }

    public function render()
    {
        $this->root_view ??= config('laravext.root_view');

        $laravext = $this->pageData();

        View::share('laravext', $laravext);

        return view($this->root_view);
    }
}
