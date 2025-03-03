import '../css/app.css';
import './bootstrap';

import { createLaravextApp } from '@laravext/vue3';
import { resolveComponent } from '@laravext/vue3/tools';
import { initializeTheme } from './composables/useAppearance';
import { Ziggy } from './ziggy.js';

declare global {
    interface Window {
        Ziggy: typeof Ziggy;
    }
}


document.addEventListener(
    'DOMContentLoaded',
    function () {
        window.Ziggy = Ziggy;

        createLaravextApp({
            nexusResolver: (name: string) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),

            progress: {
                color: '#4B5563',
            },
        });

        // This will set light / dark mode on page load...
        initializeTheme();
    },
    false,
);
