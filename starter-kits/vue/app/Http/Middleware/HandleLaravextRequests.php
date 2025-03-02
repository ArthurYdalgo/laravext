<?php

namespace App\Http\Middleware;

use App\Models\AbuseReport;
use App\Models\Reaction;
use Closure;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Laravext\Middleware;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpFoundation\Response;
use Tighten\Ziggy\Ziggy;

class HandleLaravextRequests extends Middleware
{
    public function share(Request $request)
    {   
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $appearance = $request->cookie('appearance', $_COOKIE['appearance'] ?? 'light');
        $sidebar = $request->cookie('sidebar', $_COOKIE['sidebar'] ?? 'true');

        return array_merge(parent::share($request), [
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'appearence' => $appearance,
            'sidebar' => $sidebar,
        ]);

    }
}
