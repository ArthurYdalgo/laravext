<?php

namespace App\Enums;

use App\Traits\Enumerable;

enum DeveloperRole: string
{
    use Enumerable;
    
    case backend = 'Backend';
    case designer = 'Designer';
    case frontend = 'Frontend';
    case fullstack = 'Fullstack';
    case qa = 'QA';
    case devops = 'DevOps';
}