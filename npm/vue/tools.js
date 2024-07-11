// import { laravext } from "./index";
import {defineComponent, createApp, h} from 'vue';

export function findNexus(doc = null) {

    if(typeof window !== 'undefined') {
        doc = document;
    }

    const nexusSection = doc.querySelectorAll('section[section-type="laravext-nexus-section"]');
    return nexusSection;
}

export function findStrands(doc = null) {

    if(typeof window !== 'undefined') {
        doc = document;
    }

    const strands = doc.querySelectorAll('section[section-type="laravext-strand-section"]');
    return strands;
}

export async function resolveComponent(path, pages) {
    const page = pages[path];
    if (typeof page === 'undefined') {
        throw new Error(`Page not found: ${path}`);
    }

    return typeof page === 'function' ? page() : page;
}

export function isEnvProduction(){
    return !['development', 'local'].includes(import.meta.env.VITE_APP_ENV ?? 'production');
}


export function clientRender() {
    // const laravext = laravext();
    const laravext = window.__laravext;

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

    let nexusResolver = window.__laravext.app.nexusResolver;
    let strandsResolver = window.__laravext.app.strandsResolver;
    let conventions = window.__laravext.app.conventions;
    let beforeSetup = window.__laravext.app.beforeSetup;
    let setup = window.__laravext.app.setup;
    let setupNexus = window.__laravext.app.setupNexus;
    let setupStrand = window.__laravext.app.setupStrand;
    let reverseSetupOrder = window.__laravext.app.reverseSetupOrder;

    if (beforeSetup) {
        beforeSetup({ laravext: window.__laravext });
    }

    if (nexusResolver) {
        const nexusComponentPath = laravext?.page_data?.nexus?.page?.replaceAll('\\', '/');
        const nexusTags = findNexus();
        nexusTags.forEach((nexusElement) => {
            if (nexusComponentPath) {
                nexusResolver(nexusComponentPath).then(async (NexusComponent) => {
                    if (!isEnvProduction()) {
                        console.debug(`Loading page at ${nexusComponentPath}`);
                        console.debug(`Page at ${nexusComponentPath} loaded successfully`);
                    }

                    let pageComponent = NexusComponent.default

                    let renderer = () => h(pageComponent, {
                        props: () => ({
                            // laravext: laravext?.page_data
                        }),
                    });

                    conventions = conventions.filter(convention => convention !== 'page');

                    for (let i = 0; i < conventions.length; i++) {
                        if (laravext?.page_data?.nexus?.[conventions[i]]) {
                            try {
                                if (!isEnvProduction()) {
                                    console.debug(`Loading convention ${conventions[i]} at ${laravext?.page_data?.nexus?.[conventions[i]]}`)
                                };
                                let conventionComponent = (await nexusResolver(laravext?.page_data?.nexus?.[conventions[i]])).default;
                                if (!isEnvProduction()) {
                                    console.debug(`Convention ${conventions[i]} at ${laravext?.page_data?.nexus?.[conventions[i]]} loaded successfully`);
                                }

                                const previousRenderer = renderer;
                                renderer = () => h(conventionComponent, { }, {
                                    default: () => previousRenderer(),
                                    props: () => ({
                                        // laravext: laravext?.page_data
                                    })
                                });
                            } catch (error) {
                                console.error(`Error loading convention ${conventions[i]} at ${laravext?.page_data?.nexus?.[conventions[i]]}:`, error);
                            }
                        }
                    }

                    const rootComponent = defineComponent({
                        render() {
                            return renderer()
                        }
                    });

                    const app = createApp(rootComponent);

                    app.mixin({
                        provide: mixins,
                        methods: mixins
                    })
                    
                    laravext.app.vue?.unmount();
                    
                    app.mount(nexusElement);

                    window.__laravext.app.vue = app;
                }).catch((error) => {
                    console.error(`Error loading page at ${nexusComponentPath}:`, error);
                    throw error;
                });
            }
        });
    }

    if (strandsResolver) {
        const strands = findStrands();
        strands.forEach((strandElement) => {
            const strandComponentPath = strandElement.getAttribute('strand-component');
            const strandData = JSON.parse(strandElement.getAttribute('strand-data'));

            if (strandComponentPath) {
                strandsResolver(strandComponentPath).then((StrandComponent) => {
                    let strand = StrandComponent.default;

                    let  strandApp = createApp(StrandComponent.default, { laravext, ...strandData });
                    
                    if (setupStrand) {
                        strandApp = setupStrand({ strand, laravext, strandData });
                    }

                    strandApp.mixin({
                        provide: mixins,
                        methods: mixins
                    })

                    strandApp.mount(strandElement);
                }).catch((error) => {
                    console.error(`Error loading component at ${strandComponentPath}:`, error);
                });
            }
        });
    }
}