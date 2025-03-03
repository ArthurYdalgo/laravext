import '../css/app.css';
import './bootstrap';

import { createLaravextApp } from '@laravext/vue3';
import { resolveComponent } from '@laravext/vue3/tools';
import { initializeTheme } from './composables/useAppearance';
import { ZiggyVue } from 'ziggy-js';

document.addEventListener(
    'DOMContentLoaded',
    function () {
        createLaravextApp({
            nexusResolver: (name: string) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),

            setup: ({ app, laravext }: { app: any; laravext: any }) => {
                app.use(ZiggyVue);
        
                return app;
            },

            progress: {
                color: '#4B5563',
            },
        });

        // This will set light / dark mode on page load...
        initializeTheme();
    },
    false,
);
