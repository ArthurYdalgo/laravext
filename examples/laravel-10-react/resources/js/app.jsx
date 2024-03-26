import './bootstrap';
import '../css/app.css';

import { createLaravextApp, resolvePageComponent } from "@laravext/react"

document.addEventListener('DOMContentLoaded', function() {
    createLaravextApp({
        nexusResolver: (name) => resolvePageComponent(`./nexus/${name}.jsx`, import.meta.glob('./nexus/**/*.jsx')),
        strandsResolver: (name) => resolvePageComponent(`./strands/${name}.jsx`, import.meta.glob('./strands/**/*.jsx'))
    })
 }, false);




