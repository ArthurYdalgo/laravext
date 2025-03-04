/* prettier-ignore */
import { createLaravextSsrApp } from '@laravext/react';
import { serve } from '@laravext/react/server';
import { resolveComponent } from '@laravext/react/tools';
import { route } from '../../vendor/tightenco/ziggy/src/js';

serve(({ window, cookies }: { window: any; cookies: any }) => {
    return createLaravextSsrApp({
        // This is optional, the default is renderToString from 'react-dom/server', but you can use renderToStaticMarkup if you want
        // render: renderToString,

        nexusResolver: (name: string) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
        strandsResolver: (name: string) => resolveComponent(`./strands/${name}.jsx`, import.meta.glob('./strands/**/*.jsx')),

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
        // Don't forget to pass the window object to the laravext object
        laravext: window.__laravext,
        document: window.document,
    });
});
