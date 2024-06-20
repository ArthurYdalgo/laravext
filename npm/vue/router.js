import { isEnvProduction, render } from './tools';
import { version, laravextPageData } from './index';
import { endProgress, startProgress } from './progress';

export function visit(url) {
    if(!history?.pushState){
        if(!isEnvProduction()){
            console.debug('History API not supported. Redirecting');
        }
        window.location.href = url;
        return;
    }

    if(!isEnvProduction()){
        console.debug(`Visiting page at ${url}`);
    }
    
    startProgress();

    fetch(url, {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'X-Laravext': true,
            'X-Laravext-Version': version(),
            'X-Laravext-Root-View': laravextPageData().root_view,
        },
    }).then(async (response) => {
        if (!response.headers.get('X-Laravext')) {
            if(!isEnvProduction()){
                console.debug('Laravext header not found in response. Redirecting');
            }
            window.location.href = url;
            return;
        }

        return response.json();
    })
        .then((data) => {
            if(!isEnvProduction()){
                console.debug(`Loading page at ${url}`, data);
            }

            if (data.action == 'redirect') {
                console.log(`Redirecting to ${data.url}`, data);
                window.location.href = data.url;
                return;
            }

            window.__laravext.page_data = data.laravext_page_data;

            try {
                render();

                /** @todo fix it, as the pages are not always returnable */
                history.pushState({}, '', url);
            } catch (error) {
                console.error('Error updating page data:', error);
                window.location.href = url;
            }

            endProgress();
        });
}