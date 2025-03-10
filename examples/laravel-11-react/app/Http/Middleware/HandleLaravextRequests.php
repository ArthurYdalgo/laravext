<?php

namespace App\Http\Middleware;

use App\Models\AbuseReport;
use App\Models\Reaction;
use Closure;
use Illuminate\Http\Request;
use Laravext\Middleware;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpFoundation\Response;
use Tighten\Ziggy\Ziggy;

class HandleLaravextRequests extends Middleware
{
    public function share(Request $request)
    {   
        $now = now();
        $user = $request->user();

        if($user){
            $user->loadMissing(['roles', 'tags' => function($query){
                $query->orderBy('slug');
            }]);
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user,
            ],
            'ziggy' => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'available_reactions' => Reaction::$available_reactions,
            'available_abuse_report_types' => AbuseReport::$available_types,
        ]);

    }
}
