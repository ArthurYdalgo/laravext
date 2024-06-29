import { defineComponent, reactive } from 'vue';
import { setupProgress } from './progress';
import { clientRender } from './tools';
import { findNexus } from './tools';
import { visit } from './router';
import { renderToString } from '@vue/server-renderer'
import { isEnvProduction } from './tools';
import { createSSRApp, h } from 'vue';
import {laravext as laravextReactive} from './laravext';

export const laravext = () => {
    return laravextReactive.value;
}

export const createLaravextContext = (laravextContext) => {
    laravextReactive.value = laravextContext;
}

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

export const Head = defineComponent({
    props: {
        title: String
    },
    mounted() {
        if (this.title) {
            document.title = this.title;
        }
    },
    render() {
        return null;
    }
});

// window.addEventListener("popstate", function (event) {
//     visit(window.location.href);
// });

export function createLaravextApp({ nexusResolver, strandsResolver, uses = () => [], conventions = [
    'error',
    'layout',
    'middleware',
], progress = {} }) {
    window.__laravext.app = {
        nexusResolver,
        strandsResolver,
        uses,
        conventions,
    }

    if (progress) {
        setupProgress(progress);
    }

    clientRender();
}

export async function createLaravextSsrApp({ nexusResolver, strandsResolver, uses = () => [], conventions = [
    'error',
    'layout',
    'middleware',
], laravext, document, render }) {

    createLaravextContext(laravext);

    if (nexusResolver) {
        const nexusComponentPath = laravext.page_data?.nexus?.page?.replaceAll('\\', '/');
        const nexusTags = findNexus(document);
        for (let i = 0; i < nexusTags.length; i++) {
            let nexusElement = nexusTags[i];

            if (nexusComponentPath) {
                let NexusComponent = await nexusResolver(nexusComponentPath);

                if (!isEnvProduction()) {
                    console.debug(`Loading page at ${nexusComponentPath}`);
                    console.debug(`Page at ${nexusComponentPath} loaded successfully`);
                }

                let pageComponent = NexusComponent.default

                let renderer = () => h(pageComponent, { laravext: laravext.page_data }, {
                    props: () => ({
                        laravext: laravext.page_data
                    }),
                });

                conventions = conventions.filter(convention => convention !== 'page');

                for (let i = 0; i < conventions.length; i++) {
                    if (laravext.page_data?.nexus?.[conventions[i]]) {
                        try {
                            if (!isEnvProduction()) {
                                console.debug(`Loading convention ${conventions[i]} at ${laravext.page_data?.nexus?.[conventions[i]]}`)
                            };
                            let conventionComponent = (await nexusResolver(laravext.page_data?.nexus?.[conventions[i]])).default;
                            if (!isEnvProduction()) {
                                console.debug(`Convention ${conventions[i]} at ${laravext.page_data?.nexus?.[conventions[i]]} loaded successfully`);
                            }

                            const previousRenderer = renderer;
                            renderer = () => h(conventionComponent, { laravext }, {
                                default: () => previousRenderer(),
                                props: () => ({
                                    laravext
                                })
                            });
                        } catch (error) {
                            console.error(`Error loading convention ${conventions[i]} at ${laravext.page_data?.nexus?.[conventions[i]]}:`, error);
                        }
                    }
                }

                const rootComponent = defineComponent({
                    render() {
                        return renderer()
                    }
                });

                const app = createSSRApp(rootComponent, );

                for (let use of uses()) {
                    app.use(use.plugin, use.options ?? {});
                }
        
                let renderedComponent = render ? await render(app) : await renderToString(app);

                nexusElement.innerHTML = renderedComponent;

            }
        }
    }
}
