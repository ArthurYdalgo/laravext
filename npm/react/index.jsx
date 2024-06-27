import { setupProgress } from './progress';
import { clientRender, findNexus, findStrands, isEnvProduction } from './tools';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

import { visit } from './router';
import laravext from './laravext';
import LaravextContext from './LaravextContext';

export const laravextPageData = () => {
    return laravext().page_data;
}

export const version = () => {
    return laravextPageData().version;
}

export const nexus = () => {
    return laravextPageData().nexus;
}

export const nexusProps = () => {
    return nexus().props;
}

export const sharedProps = () => {
    return laravextPageData().shared_props;
}

export const routeParams = () => {
    return laravextPageData().route_params;
}

export const routeName = () => {
    return laravextPageData().route_name;
}

export const queryParams = () => {
    return laravextPageData().query_params;
}

export function Head({ title }) {
    if (title) {
        document.title = title;
    }
    return null;
}


export function createLaravextApp({ nexusResolver, strandsResolver, conventions = [
    'error',
    'layout',
    'middleware',
], progress = {} }) {

    window.__laravext.app = {
        nexusResolver,
        strandsResolver,
        conventions,
    }

    if (progress) {
        setupProgress(progress);
    }

    clientRender();
}



export async function createLaravextSsrApp({ nexusResolver, strandsResolver, conventions = [
    'error',
    'layout',
    'middleware',
], laravext, document, render}) {

    if (nexusResolver) {
        const nexusComponentPath = laravext?.page_data?.nexus?.page?.replaceAll('\\', '/');
        const nexus_tags = findNexus(document);

        for (let i = 0; i < nexus_tags.length; i++) {
            let nexusElement = nexus_tags[i];

            if (nexusComponentPath) {
                let NexusModule = await nexusResolver(nexusComponentPath)
                if (!isEnvProduction()) {
                    console.debug(`Loading page at ${nexusComponentPath}`);
                }
                let nexus = <NexusModule.default laravext={laravext} />
                if (!isEnvProduction()) {
                    console.debug(`Page at ${nexusComponentPath} loaded successfully`);
                }

                conventions = await conventions.filter(convention => convention !== 'page');

                for (let i = 0; i < conventions.length; i++) {
                    if (laravext?.page_data?.nexus?.[conventions[i]]) {
                        try {

                            if (!isEnvProduction()) {
                                console.debug(`Loading convention ${conventions[i]} at ${laravext?.page_data?.nexus?.[conventions[i]]}`)
                            };
                            let Convention = await nexusResolver(laravext?.page_data?.nexus?.[conventions[i]]);
                            if (!isEnvProduction()) {
                                console.debug(`Convention ${conventions[i]} at ${laravext?.page_data?.nexus?.[conventions[i]]} loaded successfully`);
                            }

                            nexus = <Convention.default laravext={laravext}>{nexus}</Convention.default>;
                        } catch (error) {
                            console.error(`Error loading convention ${conventions[i]} at ${laravext?.page_data?.nexus?.[conventions[i]]}:`, error);
                        }
                    }
                }

                nexus = <LaravextContext.Provider value={laravext}>{nexus}</LaravextContext.Provider>;
                let staticMarkup = render ? render(nexus) : renderToString(nexus);
                nexusElement.innerHTML = staticMarkup;
            }
        }
    }

    if (strandsResolver) {
        const strands = findStrands(document);
        for (let i = 0; i < strands.length; i++) {
            let strandElement = strands[i];
            const strandComponentPath = strandElement.getAttribute('strand-component');
            const strandData = JSON.parse(strandElement.getAttribute('strand-data'));

            if (strandComponentPath) {
                let StrandModule = await strandsResolver(strandComponentPath)

                let strand = <LaravextContext.Provider value={laravext}><StrandModule.default laravext={{ ...laravext }} {...strandData} /></LaravextContext.Provider>

                let staticMarkup = render ? render(strand) : renderToString(strand);
                strandElement.innerHTML = staticMarkup;
            }
        }
    }
}

export { default as laravext } from './laravext';