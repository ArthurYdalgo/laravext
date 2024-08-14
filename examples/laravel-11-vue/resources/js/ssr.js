import './bootstrap';
import '../css/app.css';
import { createI18n } from 'vue-i18n'
import pt from './../../lang/pt.json'
import { plugin as fkPluging, defaultConfig as fkDefaultConfig } from '@formkit/vue'
import VueSweetalert2 from 'vue-sweetalert2';
import fkConfig from './../../formkit.theme.js'
import 'sweetalert2/dist/sweetalert2.min.css';
import { resolveComponent } from '@laravext/vue3/tools';
import { serve } from "@laravext/vue3/server"
import { createLaravextSsrApp } from '@laravext/vue3';
import { route } from '../../vendor/tightenco/ziggy/src/js';


// Change these to what you see fit, if you want to ignore some logs
const errorLogShouldBeLogged = (message) => {
    if(typeof message !== 'string') return true;
    
    if(message.includes("Could not find one or more icon(s)")) return false;

    return true;
}
const warnLogShouldBeLogged = (message) => {
    if(typeof message !== 'string') return true;
    
    if(/\[intlify\] Not found '(.*?)' key in '(.*?)' locale messages./gm.test(message)) return false;
    if(/\[intlify\] Fall back to translate '(.*?)' key with '(.*?)' locale./gm.test(message)) return false;
    if(message == '[Vue warn]: Method "__floating-vue__popper" has type "object" in the component definition. Did you reference the function correctly?') return false;

    return true;
}

const originalError = console.error;
console.error = (message, ...args) => {
    if (errorLogShouldBeLogged(message)) {
        originalError(message, ...args);
    }
};

// Change this to what you see fit

const originalWarn = console.warn;
console.warn = (message, ...args) => {
    if(warnLogShouldBeLogged(message)) {
        originalWarn(message, ...args);
    }
}

serve(({ window, cookies }) => createLaravextSsrApp({
    // This is optional, the default is renderToString from '@vue/server-renderer', but you can use renderToStaticMarkup if you want
    // render: renderToString,

    nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
    strandsResolver: (name) => resolveComponent(`./strands/${name}.vue`, import.meta.glob('./strands/**/*.vue')),

    // The beforeSetup function is executed once, before any of the setups.
    // You can use this to set up global variables or anything else, such as localization, cookies, etc.
    beforeSetup: ({ laravext }) => {
        if(laravext?.page_data?.shared_props?.ziggy){

            global.route = (name, params, absolute) =>
                route(name, params, absolute, {
                    ...(laravext.page_data.shared_props.ziggy),
                    url: laravext.page_data.shared_props.ziggy.url,
                });

            global.Ziggy = laravext.page_data.shared_props.ziggy;
        }

        let user = laravext.page_data?.shared_props?.auth?.user;

        let locale = user?.locale ?? cookies['locale'] ?? 'en';

        const i18n = createI18n({
            legacy: false,
            locale: locale,
            fallbackLocale: 'en',
            messages: {
                pt
            }
        })

        laravext.app.i18n = i18n;
    },

    // This setup is applied to all components, including nexus and strands
    setup: ({ app, laravext }) => {
        app.use(laravext.app.i18n);
        app.use(VueSweetalert2);
        app.use(fkPluging, fkDefaultConfig(fkConfig));

        return app;
    },

    // The setupNexus function is applied only to the nexus component, after the 'setup' function, unless reverseSetupOrder is true
    // setupNexus: ({ nexus, laravext }) => {
    //     // Anything you want to do with the nexus app instance
    //     nexus.use(Something)

    //     return nexus;
    // },
    // The setupStrand function is applied only to the strand components, after the 'setup' function, unless reverseSetupOrder is true
    // The 'strandData' parameter is the data passed to the strand component from the blade where it was located, if applicable
    // setupStrand: ({strand, laravext, strandData}) => {
    //     // Anything you want to do with the strand app instance
    //     strand.use(SomethingElse)
    //     return strand
    // },

    // If you want to reverse the order of the setup functions (for some reason), set this to true
    // reverseSetupOrder: true,

    // Don't forget to pass the window object to the laravext object
    laravext: window.__laravext,
    document: window.document,
}));
