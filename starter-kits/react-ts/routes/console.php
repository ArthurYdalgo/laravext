<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

use Illuminate\Support\Facades\Schedule;
 
Schedule::command('sanctum:prune-expired --hours=24')->daily();


