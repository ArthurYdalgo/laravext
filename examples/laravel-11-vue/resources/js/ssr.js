import './bootstrap';
import '../css/app.css';

import VueCookies from 'vue-cookies'

import { createI18n } from 'vue-i18n'
import pt from './../../lang/pt.json'
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import { plugin as fkPluging, defaultConfig as fkDefaultConfig } from '@formkit/vue'
import VueSweetalert2 from 'vue-sweetalert2';
import fkConfig from './../../formkit.theme.js'
import 'sweetalert2/dist/sweetalert2.min.css';
import { resolveComponent } from '@laravext/vue/tools';
import express from 'express';
import { JSDOM } from 'jsdom';
import { serve } from "@laravext/vue/server"
import { renderToString } from '@vue/server-renderer';
import { createLaravextSsrApp } from '@laravext/vue';
import { route } from '../../vendor/tightenco/ziggy/src/js';
import Cookies from 'js-cookie';

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
    // This is optional, the default is renderToString, but you can use renderToStaticMarkup if you want
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

            global.Ziggy = dom.window.__laravext.page_data.shared_props.ziggy;
        }

        let user = laravext.page_data?.shared_props?.auth?.user;

        let locale = user?.locale ?? Cookies.get('locale') ?? 'en';

        const i18n = createI18n({
            legacy: false,
            locale: locale,
            fallbackLocale: 'en',
            messages: {
                pt
            }
        })

        await createLaravextSsrApp({
            nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
            strandsResolver: (name) => resolveComponent(`./strands/${name}.vue`, import.meta.glob('./strands/**/*.vue')),

            
            setupNexus: ({ nexus, laravext }) => {
            },
            setupStrand: ({ strand, laravext }) => {
            },
            uses: () => {
                let locale = user?.locale ?? Cookies.get('locale') ?? 'en';

                const i18n = createI18n({
                    legacy: false,
                    locale: locale,
                    fallbackLocale: 'en',
                    messages: {
                        pt
                    }
                })

                return [
                    { plugin: VueCookies, options: { expires: '7d' } },

                    {
                        plugin: ZiggyVue, options: {
                            ...(dom.window.__laravext.page_data.shared_props.ziggy),
                            url: dom.window.__laravext.page_data.shared_props.ziggy.url,
                        }
                    },

                    /** @see https://vue-i18n.intlify.dev/guide/essentials/started.html for original example */
                    { plugin: i18n },
                    { plugin: VueSweetalert2 },
                    { plugin: fkPluging, options: fkDefaultConfig(fkConfig) },
                ]

            },
            laravext: dom.window.__laravext,
            document: dom.window.document,
        })
        
        // Get the updated HTML string
        const updatedHtmlString = dom.serialize();

        res.send(updatedHtmlString);

        if (process.env.NODE_ENV !== 'production') {
            console.timeEnd('Render Time');
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Error rendering page: ' + error.message);
    }
});

app.listen(port, () => {
    console.log(`Node.js server is running on port ${port}`);
});
