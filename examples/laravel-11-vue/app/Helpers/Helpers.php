<?php

use Laravel\Prompts\Output\ConsoleOutput;

if (!function_exists('user')){
    /**
     * Get the authenticated user
     * 
     * @return \App\Models\User|null
     */
    function user(){
        return auth()->user();
    }
}

if (!function_exists('line')) {
    function line($string, $style = 'info')
    {
        $output = new ConsoleOutput();

        $styled = "<$style>  $string</$style>";

        $output->writeln($styled);
    }
}