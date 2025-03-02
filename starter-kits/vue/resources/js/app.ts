import '../css/app.css';
import './bootstrap';

import './bootstrap';
import '../css/app.css';
import { createLaravextApp } from "@laravext/vue3"
import { initializeTheme } from './composables/useAppearance';
import { resolveComponent } from '@laravext/vue3/tools';

document.addEventListener('DOMContentLoaded', function () {
    createLaravextApp({
        nexusResolver: (name: string) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
        
        progress: {
            color: '#4B5563',
        },
    });
    
    // This will set light / dark mode on page load...
    initializeTheme();
}, false);

