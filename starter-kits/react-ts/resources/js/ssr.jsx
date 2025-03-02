/* prettier-ignore */
import { createLaravextSsrApp } from '@laravext/react';
import { resolveComponent } from "@laravext/react/tools"
import { serve } from "@laravext/react/server"

serve(({ window, cookies }) => createLaravextSsrApp({
    // This is optional, the default is renderToString from 'react-dom/server', but you can use renderToStaticMarkup if you want
    // render: renderToString,

    nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
    strandsResolver: (name) => resolveComponent(`./strands/${name}.jsx`, import.meta.glob('./strands/**/*.jsx')),

    // The beforeSetup function is executed once, before any of the setups. 
    // You can use this to set up global variables or anything else, such as internationalization, cookies, etc.
    beforeSetup: ({ laravext }) => {
        if(laravext?.page_data?.shared_props?.ziggy){
            global.route = (name, params, absolute) =>
                route(name, params, absolute, {
                    ...(laravext.page_data.shared_props.ziggy),
                    url: laravext.page_data.shared_props.ziggy.url,
                });
    
            global.Ziggy = laravext.page_data.shared_props.ziggy;
        }
    },

    // Don't forget to pass the window object to the laravext object
    laravext: window.__laravext,
    document: window.document,
}))