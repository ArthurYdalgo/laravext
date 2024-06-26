import express from 'express';
import { JSDOM } from 'jsdom';
import Laravext, { createLaravextSsrApp, createLaravextApp } from '@laravext/react';
import { resolveComponent } from "@laravext/react/tools"
import { route } from '../../vendor/tightenco/ziggy/src/js';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pt from '../../lang/pt.json'
import {sharedProps} from '@laravext/react';

const app = express();
const port = 13714;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

if (process.env.NODE_ENV === 'production' || true) {
    const originalError = console.error;
    console.error = (message, ...args) => {
        if (!message.includes('useLayoutEffect does nothing on the server')) {
            originalError(message, ...args);
        }
    };
}

app.post('/render', async (req, res) => {
    try {
        console.time('doSomething');
        const { html } = req.body;
        const dom = new JSDOM(html, { runScripts: "dangerously" });
        const navigator = dom.window.navigator;
        
        // set global window variable to be accesses inside renderToStaticMarkup
        global.navigator = navigator;

        let laravext = new Laravext(dom.window);

        global.route = (name, params, absolute) =>
            route(name, params, absolute, {
                ...(laravext.sharedProps().ziggy),
                url: laravext.sharedProps().ziggy.url,
            });

        global.Ziggy = laravext.sharedProps().ziggy;

        const user = laravext.sharedProps()?.auth?.user;

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

        await laravext.createLaravextSsrApp({
            nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
            strandsResolver: (name) => resolveComponent(`./strands/${name}.jsx`, import.meta.glob('./strands/**/*.jsx')),
        })

        // console.log("here2");
        // // Get the updated HTML string
        const updatedHtmlString = dom.serialize();

        res.send(updatedHtmlString);
        console.timeEnd('doSomething');
        // res.send('ok');

    } catch (error) {

        res.status(500).send('Error rendering page: ' + error.message);
        throw error;
    }
});

app.listen(port, () => {
    console.log(`Node.js server is running on port ${port}`);
});



