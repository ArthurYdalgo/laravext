<?php

namespace Laravext;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Facades\View;

class ResponseFactory
{
    public $root_view;
    public $component;
    public $props;
    public $query_params;
    public $route_params;
    public $shared_props;
    
    public function __construct()
    {
        $this->props = [];
        $this->query_params = [];
        $this->shared_props = [];
    }

    public function nexus($component = null, $props = [])
    {
        $this->component = $component;

        return $this->withProps($props);
    }

    public function version()
    {
        if (config('app.asset_url')) {
            return md5(config('app.asset_url'));
        }

        if (file_exists($manifest = public_path('mix-manifest.json'))) {
            return md5_file($manifest);
        }

        if (file_exists($manifest = public_path('build/manifest.json'))) {
            return md5_file($manifest);
        }

        return null;
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

    public function withQueryParams($query_params = [])
    {
        $this->query_params = array_merge($this->query_params, $query_params);

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
                'component' => $this->component,
                'props' => $this->props,
            ],
            'shared_props' => $this->shared_props,
            'route_params' => request()?->route()?->parameters(),
            'query_params' => array_merge($this->query_params, request()?->query()),
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
