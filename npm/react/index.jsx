import { setupProgress } from './progress';
import { clientRender } from './tools';
import { visit } from './router';
export { default as laravext } from './laravext'

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
] }) {

    const laravextPageData = laravext().page_data;

    if (nexusResolver) {
        const nexusComponentPath = laravextPageData?.nexus?.page?.replaceAll('\\', '/');
        const nexus_tags = findNexus();
        for (let i = 0; i < nexus_tags.length; i++) {
            let nexusElement = nexus_tags[i];

            if (nexusComponentPath) {
                let NexusModule = await nexusResolver(nexusComponentPath)
                if (!isEnvProduction()) {
                    console.debug(`Loading page at ${nexusComponentPath}`);
                }
                let nexus = <NexusModule.default laravext={laravextPageData} />
                if (!isEnvProduction()) {
                    console.debug(`Page at ${nexusComponentPath} loaded successfully`, {
                        NexusModule
                    });
                }

                conventions = conventions.filter(convention => convention !== 'page');

                for (let i = 0; i < conventions.length; i++) {
                    if (laravextPageData?.nexus?.[conventions[i]]) {
                        try {

                            if (!isEnvProduction()) {
                                console.debug(`Loading convention ${conventions[i]} at ${laravextPageData?.nexus?.[conventions[i]]}`)
                            };
                            let Convention = await nexusResolver(laravextPageData?.nexus?.[conventions[i]]);
                            if (!isEnvProduction()) {
                                console.debug(`Convention ${conventions[i]} at ${laravextPageData?.nexus?.[conventions[i]]} loaded successfully`, {
                                    Convention
                                });
                            }

                            nexus = <Convention.default laravext={laravextPageData}>{nexus}</Convention.default>;
                        } catch (error) {
                            console.error(`Error loading convention ${conventions[i]} at ${laravextPageData?.nexus?.[conventions[i]]}:`, error);
                        }
                    }
                }

                let staticMarkup = renderToString(nexus);

                nexusElement.innerHTML = staticMarkup;


            }
        }
    }

    if (strandsResolver) {
        const strands = findStrands();
        for (let i = 0; i < strands.length; i++) {
            let strandElement = strands[i];
            const strandComponentPath = strandElement.getAttribute('strand-component');
            const strandData = JSON.parse(strandElement.getAttribute('strand-data'));

            if (strandComponentPath) {
                let StrandModule = await strandsResolver(strandComponentPath)
                // pass strand data to component
                let staticMarkup = renderToString(<StrandModule.default laravext={{ ...laravextPageData }} {...strandData} />);
                strandElement.innerHTML = staticMarkup;
            }
        }
    }
}