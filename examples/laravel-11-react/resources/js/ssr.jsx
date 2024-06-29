import express from 'express';
import { JSDOM } from 'jsdom';
import { createLaravextSsrApp, createLaravextApp } from '@laravext/react';
import { resolveComponent } from "@laravext/react/tools"
import { route } from '../../vendor/tightenco/ziggy/src/js';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pt from '../../lang/pt.json'
import Cookies from 'js-cookie';
import {sharedProps} from '@laravext/react';

const app = express();
const port = 13714;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


const originalError = console.error;
console.error = (message, ...args) => {
    if (!message.includes('useLayoutEffect does nothing on the server') && !message.includes("Could not find one or more icon(s)")) {
        originalError(message, ...args);
    }
};


app.post('/render', async (req, res) => {
    try {
        if(process.env.NODE_ENV !== 'production') {
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

        global.Ziggy = dom.window.__laravext.page_data.shared_props.ziggy;

        let user = dom.window.__laravext.page_data?.shared_props?.auth?.user;

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
            laravext: dom.window.__laravext,
            document: dom.window.document,
        })
        

        // console.log("here2");
        // // Get the updated HTML string
        const updatedHtmlString = dom.serialize();

        res.send(updatedHtmlString);

        if(process.env.NODE_ENV !== 'production') {
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



