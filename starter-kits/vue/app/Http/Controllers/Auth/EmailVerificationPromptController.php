<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class EmailVerificationPromptController extends Controller
{
    /**
     * Show the email verification prompt page.
     */
    public function __invoke(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('dashboard', absolute: false));
        }

        // This is done so that when the user clicks on the link in the email, they are redirected to the dashboard.
        // If this wasn't done, the url intended would've been already pulled from the session.
        // This can be removed, if needed/desired.
        Config::set('laravext.router_url_intended_is_enabled', false);

        return nexus(props: ['status' => $request->session()->get('status')])->render();
    }
}
