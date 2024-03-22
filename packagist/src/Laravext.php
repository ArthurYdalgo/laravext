<?php

namespace ArthurYdalgo\Laravext;

class Laravext
{
    public $root_view;
    public $component;
    public $props;
    public $query_params;
    public $route_params;

    public function __construct()
    {
        $this->props = [];
        $this->query_params = request()?->query() ?? [];
        $this->route_params = request()?->route()?->parameters() ?? [];
    }

    public function nexus($component = null, $props = [])
    {
        $this->component = $component;

        return $this->withProps($props);
    }

    public function withProps($props = [])
    {
        $this->props = array_merge($this->props, $props);

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

    public function render()
    {
        $this->root_view ??= config('laravext.root_view');

        return view($this->root_view, [
            'laravext' => [
                'component' => $this->component,
                'props' => $this->props,
                'query_params' => $this->query_params,
                'route_params' => $this->route_params,
            ]
        ]);
    }
}
