import { version, laravextPageData } from './index';
import { clientRender } from './tools';
import { endProgress, startProgress } from './progress';

export function visit(url) {
    if(!history?.pushState){
        window.location.href = url;
        return;
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
            window.location.href = url;
            return;
        }

        return response.json();
    })
        .then((data) => {

            if (data.action == 'redirect') {
                window.location.href = data.url;
                return;
            }

            window.__laravext.page_data = data.laravext_page_data;

            try {
                clientRender();
                history.pushState({}, '', url);
            } catch (error) {
                console.error('Error updating page data:', error);
                window.location.href = url;
            }

            endProgress();
        });
}                                                                                                                                                                                                                                                                                                                                   