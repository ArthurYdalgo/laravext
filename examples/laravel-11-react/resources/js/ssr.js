import express from 'express';
import {JSDOM} from 'jsdom';
import {renderToStaticMarkup} from 'react-dom/server';
import { createLaravextSsrApp } from '@laravext/react';
import { resolveComponent } from "@laravext/react/tools"
import test from './test'
import { Ziggy } from './ziggy';

const app = express();
const port = 13714;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.post('/render', async (req, res) => {
    try {
        const {html} = req.body;
        const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
        const window = dom.window
        const document = window.document;
        
        // set global window variable to be accesses inside renderToStaticMarkup
        global.window = window;
        global.document = document;

        // console.log(html);

        // const component = test();

        // const targetSection = document.querySelector('section[section-type="laravext-nexus-section"]');

        // targetSection.innerHTML = renderToStaticMarkup(component);
        console.log("here1");
        console.log(Ziggy)
        global.Ziggy = Ziggy;
        window.Ziggy = Ziggy;


        await createLaravextSsrApp({
            nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
            strandsResolver: (name) => resolveComponent(`./strands/${name}.jsx`, import.meta.glob('./strands/**/*.jsx')),
        })

        

        console.log("here2");
        // Get the updated HTML string
        const updatedHtmlString = dom.serialize();

        res.send(updatedHtmlString);

    } catch (error) {
        res.status(500).send('Error rendering page: ' + error.message);
    }
});

app.listen(port, () => {
    console.log(`Node.js server is running on port ${port}`);
});



