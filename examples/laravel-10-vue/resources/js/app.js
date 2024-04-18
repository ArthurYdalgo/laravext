import './bootstrap';
import '../css/app.css';

import { createLaravextApp, resolveComponent } from "@laravext/vue"

document.addEventListener('DOMContentLoaded', function() {
    createLaravextApp({
        nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
        strandsResolver: (name) => resolveComponent(`./strands/${name}.vue`, import.meta.glob('./strands/**/*.vue'))
    })
 }, false);




