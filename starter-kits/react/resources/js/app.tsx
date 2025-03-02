import '../css/app.css';
import './bootstrap';

import { createLaravextApp } from "@laravext/react"
import { resolveComponent } from "@laravext/react/tools"
import { route as routeFn } from 'ziggy-js';
import { initializeTheme } from './hooks/use-appearance';

declare global {
    const route: typeof routeFn;
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

document.addEventListener('DOMContentLoaded', function () {
    createLaravextApp({
        nexusResolver: (name: string) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),

        progress: {
            color: '#4B5563',
        },
    });

    // This will set light / dark mode on load...
    initializeTheme();
});
