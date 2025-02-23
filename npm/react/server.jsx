import { createServer } from 'http'
import * as process from 'process'
import { JSDOM } from 'jsdom';

async function parsedRequestBody(request) {
    let body = await new Promise((resolve, reject) => {
        let data = '';
        request.on('data', chunk => {
            data += chunk;
        });
        request.on('end', () => {
            resolve(data);
        });
        request.on('error', reject);
    });

    try {
        return JSON.parse(body);
    } catch (error) {
        const params = new URLSearchParams(body);
        return Object.fromEntries(params.entries());  // Convert to plain object
    }
}

const parseCookies = (cookieHeader) => {
    if (!cookieHeader) return {};
    return cookieHeader
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((acc, [key, value]) => {
            acc[key.trim()] = decodeURIComponent(value);
            return acc;
        }, {});
};

export const serve = (createLaravextSsrApp, port = 13714) => {

    const routes = {
        '/health': async () => ({ status: 'OK', timestamp: Date.now() }),
        '/shutdown': () => process.exit(),
        '/404': async () => ({ status: 'NOT_FOUND', timestamp: Date.now() }),
        '/render': async (request, response) => {
            try {
                if (process.env.NODE_ENV !== 'production') {
                    console.time('Render Time');
                }
                
                const {html} = await parsedRequestBody(request);

                const dom = new JSDOM(html, { runScripts: "dangerously" });

                global.navigator = dom.window.navigator;

                let cookies = parseCookies(request.headers.cookie);

                await createLaravextSsrApp({ window: dom.window, request, cookies });

                const updatedHtmlString = dom.serialize();

                response.write(updatedHtmlString);

                if (process.env.NODE_ENV !== 'production') {
                    console.timeEnd('Render Time');
                }

            } catch (error) {
                console.log(error);
                response.writeHead(500);
                response.write('Error rendering page: ' + error.message);
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
    }).listen(port, () => console.log(`Laravext SSR server started at port ${port}`))
}