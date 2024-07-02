import { createServer, IncomingMessage } from 'http'
import * as process from 'process'
import { JSDOM } from 'jsdom';
import { resolveComponent } from "@laravext/react/tools"
import { route } from '../../vendor/tightenco/ziggy/src/js';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pt from '../../lang/pt.json'
import Cookies from 'js-cookie';
import { renderToString } from 'react-dom/server';

export default serve = (createLaravextSsrApp, port = 13714) => {

    const routes = {
        '/health': async () => ({ status: 'OK', timestamp: Date.now() }),
        '/shutdown': () => process.exit(),
        '/404': async () => ({ status: 'NOT_FOUND', timestamp: Date.now() }),
        '/render': async (request, response) => {
            try {
                if (process.env.NODE_ENV !== 'production') {
                    console.time('Render Time');
                }
                const { html } = request.body;
                const dom = new JSDOM(html, { runScripts: "dangerously" });

                global.navigator = dom.window.navigator;

                await createLaravextSsrApp();

                const updatedHtmlString = dom.serialize();

                response.send(updatedHtmlString);

                if (process.env.NODE_ENV !== 'production') {
                    console.timeEnd('Render Time');
                }

            } catch (error) {
                console.log(error);
                response.status(500).send('Error rendering page: ' + error.message);
            }
        },
    }

    createServer(async (request, response) => {
        const dispatchRoute = routes[request.url] || routes['/404']

        try {
            await dispatchRoute(request, response)
        } catch (e) {
            console.error(e)
        }

        response.end()
    }).listen(_port, () => console.log('Inertia SSR server started.'))
}