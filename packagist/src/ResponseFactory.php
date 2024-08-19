<?php

namespace Laravext;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Traits\Macroable;

class ResponseFactory
{
    use Macroable;

    public $props;
    public $root_view;
    public $query_params;
    public $route_params;
    public $shared_props;
    public $route_name;

    // Page Conventions
    public $middleware, $layout, $error, $page, $server_skeleton;

    public function __construct()
    {
        $this->props = [];
        $this->shared_props = [];
        $this->query_params = request()?->query();
        $this->route_params = request()?->route()?->parameters();
        $this->route_name = request()?->route()?->getName();
    }

    public static function getUriCache($uri = null)
    {
        $uri = $uri ?? request()?->route()?->uri();

        if (!$uri) {
            return null;
        }

        return Cache::store('array')->get("laravext-uri:{$uri}-cache");
    }

    public static function clearUriCache($uri = null)
    {
        $uri = $uri ?? request()?->route()?->uri();

        if (!$uri) {
            return null;
        }

        return Cache::store('array')->forget("laravext-uri:{$uri}-cache");
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

    public function withHead(string|int|array $name, $value = null)
    {
        $head = array_merge($this->shared_props['head'] ?? [], is_array($name) ? $name : [$name => $value]);

        return $this->withSharedProps(compact('head'));
    }

    public function withHeadTitle($title)
    {
        return $this->withHead(compact('title'));
    }

    public function withHeadDescription($description)
    {
        return $this->withHead(compact('description'));
    }

    public function withError($error)
    {
        $this->error = $error;

        return $this;
    }

    public function withViewSkeleton($view_name, array $props = [])
    {
        $html_skeleton = view($view_name, array_merge(
            $this->shared_props,
            $this->props,
            $props
        ))->render();

        return $this->withHtmlSkeleton($html_skeleton);
    }

    public function withHtmlSkeleton($html_skeleton)
    {
        $this->server_skeleton = $html_skeleton;

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

    public function page_data()
    {
        $uri_cache = $this->getUriCache();

        return [
            'nexus' => [
                'page' => $this->page ?? $uri_cache['page'] ?? null,
                'props' => $this->props,
                'server_skeleton' => $this->server_skeleton ?? $uri_cache['server_skeleton'] ?? null,
                'middleware' => $this->middleware ?? $uri_cache['middleware'] ?? null,
                'layout' => $this->layout ?? $uri_cache['layout'] ?? null,
                'error' => $this->error ?? $uri_cache['error'] ?? null,
            ],
            'root_view' => $this->root_view ?? $uri_cache['root_view'] ?? config('laravext.root_view'),
            'shared_props' => $this->shared_props,
            'route_params' => $this->route_params,
            'query_params' => $this->query_params,
            'route_name' => $this->route_name,
            'version' => Router::version(),
            'url_intended' => config('laravext.router_url_intended_is_enabled') ? Session::pull('url.intended') : null,
        ];
    }

    private function responseShouldBeServerSideRendered($request)
    {
        // If SSR is disabled
        if (!config('laravext.ssr.enabled')) {
            return false;
        }

        // If SSR is enabled only for specific URIs, check if the current URI is in the list
        if (config('laravext.ssr.enabled') === 'only' && !($request->is(config('laravext.ssr.uris', [])) || $request->routeIs(config('laravext.ssr.route_names', [])))) {
            return false;
        }

        // If SSR is enabled except for specific URIs, check if the current URI is in the list
        if (config('laravext.ssr.enabled') === 'except' && ($request->is(config('laravext.ssr.uris', [])) || $request->routeIs(config('laravext.ssr.route_names', [])))) {
            return false;
        }

        return true;
    }

    public function render()
    {
        $laravext_page_data = $this->page_data();
        $root_view = $laravext_page_data['root_view'];

        $request = request();

        if (!$request->header('X-Laravext') || config('laravext.force_page_visit')) {
            View::share('laravext_page_data', $laravext_page_data);

            $view_data = array_merge($laravext_page_data['shared_props'], $laravext_page_data['nexus']['props']);

            View::share($view_data);

            $view = view($root_view);

            // Check if this request should be server side rendered
            if (!$this->responseShouldBeServerSideRendered($request)) {
                return $view;
            }

            $rendered_view = $view->render();

            try {
                return Http::withHeaders($request->headers->all())
                    ->post(config("laravext.ssr.url", 'http://localhost:13714/render'), [
                        'html' => $rendered_view,
                    ])->body();
            } catch (\Throwable $th) {
                report($th);

                return $rendered_view;
            }
        }

        $request_laravext_root_view = $request->header('X-Laravext-Root-View');
        $request_laravext_version = $request->header('X-Laravext-Version');

        $headers = [
            'X-Laravext' => true,
            'X-Laravext-Version' => $laravext_page_data['version'],
            'X-Laravext-Root-View' => $root_view,
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
            'Pragma' => 'no-cache',
            'Expires' => '0',
        ];

        if ($request_laravext_version != $laravext_page_data['version'] || $request_laravext_root_view != $root_view) {
            return response()->json([
                'action' => 'redirect',
                'url' => $request->fullUrl(),
            ], headers: $headers);
        }

        $path = $request->path();
        $query_params = $laravext_page_data['query_params'];

        if ($query_params) {
            $path .= '?' . http_build_query($query_params);
        }

        if (!str($path)->startsWith('/')) {
            $path = "/{$path}";
        }

        // This is not needed if it's a visit with a render action
        unset($laravext_page_data['server_skeleton']);

        return response()->json([
            'action' => 'render',
            'laravext_page_data' => $laravext_page_data,
            'path' => $path,
        ], headers: $headers);
    }
}
