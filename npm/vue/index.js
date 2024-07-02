import { defineComponent, createSSRApp, h } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { setupProgress } from './progress';
import { clientRender, findNexus, findStrands, isEnvProduction } from './tools';
import { visit } from './router';

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

if (typeof window !== 'undefined') {
    window.addEventListener("popstate", function (event) {
        try {
            window.__laravext.page_data = event.state.laravext_page_data;
    
            clientRender();
        } catch (error) {
            console.error('Error updating page data:', error);
            window.location.href = window.location.href;
        }
    });
}

export function createLaravextApp({ nexusResolver, strandsResolver, conventions = [
    'error',
    'layout',
    'middleware',
], progress = {}, setupNexus = null, setupStrand = null}) {
    window.__laravext.app = {
        nexusResolver,
        strandsResolver,
        conventions,
        setupNexus,
        setupStrand,
    }

    if (progress) {
        setupProgress(progress);
    }

    history.pushState({laravext_page_data: window.__laravext.page_data}, '', window.location.href);

    clientRender();
}

export async function createLaravextSsrApp({ nexusResolver, strandsResolver, conventions = [
    'error',
    'layout',
    'middleware',
], laravext, document, render, setupNexus = null, setupStrand = null}) {

    let mixins = {
        '$laravext': () => laravext,
        '$sharedProps': () => laravext.page_data.shared_props,
        '$laravextPageData': () => laravext.page_data,
        '$laravextVersion': () => laravext.page_data.version,
        '$nexus': () => laravext.page_data.nexus,
        '$nexusProps': () => laravext.page_data.nexus.props,
        '$routeParams': () => laravext.page_data.route_params,
        '$routeName': () => laravext.page_data.route_name,
        '$queryParams': () => laravext.page_data.query_params,
    }

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

                const nexus = defineComponent({
                    render() {
                        return renderer()
                    }
                });

                if(setupNexus){
                   const nexusApp = setupNexus({nexus, laravext});
                }else {
                    const nexusApp = createSSRApp(nexus);
                }

                nexusApp.mixin({
                    provide: mixins,
                    methods: mixins
                })

                let renderedComponent = render ? await render(nexusApp) : await renderToString(nexusApp);

                nexusElement.innerHTML = renderedComponent;

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
                let StrandComponent = await strandsResolver(strandComponentPath);

                let strand = StrandComponent.default;

                if(setupStrand){
                    const strandApp = setupStrand({strand, laravext, strandData });
                }else{
                    const strandApp = createSSRApp(StrandComponent.default, { laravext, ...strandData });
                }

                strandApp.mixin({
                    provide: mixins,
                    methods: mixins
                })

                let renderedComponent = render ? await render(strandApp) : await renderToString(strandApp);

                strandElement.innerHTML = renderedComponent;

            }
        }
    }

}
