/* prettier-ignore */
import { createLaravextSsrApp } from '@laravext/vue3';
import { serve } from '@laravext/vue3/server';
import { resolveComponent } from '@laravext/vue3/tools';
import { ZiggyVue } from 'ziggy-js';

serve(({ window, cookies }: { window: any; cookies: any }) => {
    return createLaravextSsrApp({
        nexusResolver: (name: string) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),

        // The beforeSetup function is executed once, before any of the setups.
        // You can use this to set up global variables or anything else, such as internationalization, cookies, etc.
        beforeSetup: ({ laravext }: { laravext: any }) => {
            if (laravext?.page_data?.shared_props?.ziggy) {
                /* eslint-disable */
                // @ts-expect-error
                global.route = (name: any, params: any, absolute: boolean) =>
                    route(name, params, absolute, {
                        ...laravext.page_data.shared_props.ziggy,
                        url: laravext.page_data.shared_props.ziggy.url,
                    });

                // @ts-expect-error
                global.Ziggy = laravext.page_data.shared_props.ziggy;
                /* eslint-enable */
            }
        },

        setup: ({ app, laravext }: { app: any; laravext: any }) => {
            app.use(ZiggyVue);

            return app;
        },

        // Don't forget to pass the window object to the laravext object
        laravext: window.__laravext,
        document: window.document,
    });
});
