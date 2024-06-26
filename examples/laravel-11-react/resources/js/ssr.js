import express from 'express';
import { JSDOM } from 'jsdom';
import { createLaravextSsrApp, createLaravextApp } from '@laravext/react';
import { resolveComponent } from "@laravext/react/tools"
import { route } from '../../vendor/tightenco/ziggy/src/js/index.js';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pt from './../../lang/pt.json'

const app = express();
const port = 13714;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

if (process.env.NODE_ENV === 'production' || true) {
    const originalWarn = console.warn;
    console.warn = (message, ...args) => {
        if (!message.includes('useLayoutEffect does nothing on the server')) {
            originalWarn(message, ...args);
        }
    };
}

app.post('/render', async (req, res) => {
    try {
        const { html } = req.body;
        const dom = new JSDOM(html, { runScripts: "dangerously" });
        const window = dom.window
        const document = window.document;
        const navigator = window.navigator;

        // set global window variable to be accesses inside renderToStaticMarkup
        global.window = window;
        global.document = document;
        global.navigator = navigator;

        let laravextPageData = window.__laravext.page_data;

        global.route = (name, params, absolute) =>
            route(name, params, absolute, {
                ...laravextPageData.shared_props.ziggy,
                url: laravextPageData.shared_props.ziggy.url,
            });

        global.Ziggy = laravextPageData.shared_props.ziggy;

        const user = laravextPageData.shared_props?.auth?.user;

        i18n
            .use(initReactI18next)
            .init({
                resources: {
                    pt: {
                        translation: pt
                    }
                },
                fallbackLng: "en",
                interpolation: {
                    escapeValue: false
                }
            });

        i18n.changeLanguage(user?.locale ?? Cookies.get('locale') ?? 'en')

        await createLaravextSsrApp({
            nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
            strandsResolver: (name) => resolveComponent(`./strands/${name}.jsx`, import.meta.glob('./strands/**/*.jsx')),
        })

        // console.log("here2");
        // // Get the updated HTML string
        const updatedHtmlString = dom.serialize();

        res.send(updatedHtmlString);
        // res.send('ok');

    } catch (error) {
        res.status(500).send('Error rendering page: ' + error.message);
    }
});

app.listen(port, () => {
    console.log(`Node.js server is running on port ${port}`);
});



