import './bootstrap';
import '../css/app.css';

import { createLaravextApp, resolvePageComponent } from "@laravext/react"

document.addEventListener('DOMContentLoaded', function() {
    createLaravextApp({
        nexusResolver: (name) => resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
        strandsResolver: (name) => resolvePageComponent(`./strands/${name}.jsx`, import.meta.glob('./strands/**/*.jsx'))
    })
 }, false);




