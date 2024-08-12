import { isEnvProduction, clientRender } from './tools';
import { endProgress, startProgress } from './progress';

export function visit(url, options = {
    preserveScroll : false,
}) {
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

            let currentScroll = {x: window.scrollX, y: window.scrollY};

            window.__laravext.page_data = data.laravext_page_data;

            try {
                if(!laravext.app.disablePushedStateData()){
                    let currentState = {
                        ... history.state,
                        laravext_page_data: window.__laravext.page_data,
                        scroll_state: options?.preserveScroll ? currentScroll : {x: 0, y: 0},
                    };
    
                    history.replaceState(currentState, '', window.location.href);
                }

                clientRender({x: 0, y: 0});

                let newState = {
                    laravext_page_data: data.laravext_page_data,
                };

                history.pushState(( laravext.app.disablePushedStateData() ? {} : newState), '', url);
            } catch (error) {
                console.error('Error updating page data:', error);
                window.location.href = url;
            }

            endProgress();
        });
}