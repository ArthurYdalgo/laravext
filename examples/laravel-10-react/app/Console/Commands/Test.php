<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Laravext\Router;

class Test extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        echo json_encode(Router::getNexusDirectories(resource_path('js/nexus')), JSON_PRETTY_PRINT);
    }
}
