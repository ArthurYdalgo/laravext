import '../css/app.css';
import './bootstrap';

import { createLaravextApp } from "@laravext/react"
import { resolveComponent } from "@laravext/react/tools"
import { route as routeFn } from 'ziggy-js';
import { initializeTheme } from './hooks/use-appearance';
import { AppearanceProvider } from '@/providers/appearance-provider';

declare global {
    const route: typeof routeFn;
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

document.addEventListener('DOMContentLoaded', function () {
    // This will set light / dark mode on load...
    initializeTheme();

    createLaravextApp({
        nexusResolver: (name: string) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),

        progress: {
            color: '#4B5563',
        },

        setup: ({ component, laravext }: { component: any; laravext: any }) => {

            const initialAppearence = laravext?.page_data?.shared_props?.appearance || 'system';

            return <AppearanceProvider>
                {component}
            </AppearanceProvider>
        },
    });

});
