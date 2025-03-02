<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::redirect('settings', 'settings/profile');
});

require __DIR__.'/auth.php';
require __DIR__.'/laravext.php';
