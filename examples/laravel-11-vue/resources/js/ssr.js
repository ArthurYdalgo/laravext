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
import { createLaravextSsrApp } from '@laravext/vue';
import { route } from '../../vendor/tightenco/ziggy/src/js';
import Cookies from 'js-cookie';

const app = express();
const port = 13714;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Change these to what you see fit, if you want to ignore some logs
const errorLogShouldBeLogged = (message) => {
    if(message.includes("Could not find one or more icon(s)")) return false;

    return true;
}

const warnLogShouldBeLogged = (message) => {
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

app.post('/render', async (req, res) => {
    try {
        if (process.env.NODE_ENV !== 'production') {
            console.time('Render Time');
        }
        const { html } = req.body;
        const dom = new JSDOM(html, { runScripts: "dangerously" });

        global.navigator = dom.window.navigator;

        global.route = (name, params, absolute) =>
            route(name, params, absolute, {
                ...(dom.window.__laravext.page_data.shared_props.ziggy),
                url: dom.window.__laravext.page_data.shared_props.ziggy.url,
            });

                
        console.log({before: dom.window.__laravext?.page_data?.shared_props?.auth?.user});
        global.Ziggy = dom.window.__laravext.page_data.shared_props.ziggy;

        let user = dom.window.__laravext.page_data?.shared_props?.auth?.user;

        await createLaravextSsrApp({
            nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
            strandsResolver: (name) => resolveComponent(`./strands/${name}.vue`, import.meta.glob('./strands/**/*.vue')),
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
        console.log({after: dom.window.__laravext?.page_data?.shared_props?.auth?.user});
        // console.log("here2");
        // // Get the updated HTML string
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



