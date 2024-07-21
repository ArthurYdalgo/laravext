import { version, laravextPageData } from './index';
import { clientRender, isEnvProduction } from './tools';
import { endProgress, startProgress } from './progress';

export function visit(url) {
    if(!history?.pushState){
        window.location.href = url;
        return;
    }

    if(!isEnvProduction()){
        console.debug(`Visiting page at ${url}`);
    }
    
    startProgress();

    const laravext = window.__laravext;

    fetch(url, {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'X-Laravext': true,
            'X-Laravext-Version': laravext.page_data.version,
            'X-Laravext-Root-View': laravext.page_data.root_view,
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
                window.location.href = data.url;
                return;
            }

            window.__laravext.page_data = data.laravext_page_data;

            try {
                clientRender();

                history.pushState(( laravext.disablePushState ? {} : {laravext_page_data: laravext.page_data}), '', url);
            } catch (error) {
                console.error('Error updating page data:', error);
                window.location.href = url;
            }

            endProgress();
        });
} 