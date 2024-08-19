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

export function shouldLinkClickEventBeIntercepted(event) {
    const isLink = event.currentTarget.tagName.toLowerCase() === "a";

    return !(
        (event.target && event?.target.isContentEditable) ||
        event.defaultPrevented ||
        (isLink && event.altKey) ||
        (isLink && event.ctrlKey) ||
        (isLink && event.metaKey) ||
        (isLink && event.shiftKey) ||
        (isLink && "button" in event && event.button !== 0)
    );
}

export function clientRender(scrollState = null) {
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

        // Although you're not supposed to have more than one nexus tag, Laravext will iterate over all of them. 
        // However, unlike in React, only the last one will be used, because every app is unmounted 
        // before the next one is mounted.
        nexusTags.forEach((nexusElement) => {
            if (nexusComponentPath) {
                nexusResolver(nexusComponentPath).then(async (NexusComponent) => {
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
                                let conventionComponent = (await nexusResolver(laravext?.page_data?.nexus?.[conventions[i]])).default;

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

                    let nexusComponent = defineComponent({
                        render() {
                            return renderer()
                        }
                    });

                    let nexusApp = createApp(nexusComponent);

                    if(reverseSetupOrder && setupNexus){
                        nexusApp = setupNexus({ nexus: nexusApp, laravext });
                    }
    
                    if (setup) {
                        nexusApp = setup({ app: nexusApp, laravext });
                    }
    
                    if(!reverseSetupOrder && setupNexus){
                        nexusApp = setupNexus({ nexus: nexusApp, laravext });
                    }

                    nexusApp.mixin({
                        provide: mixins,
                        methods: mixins
                    })
                    
                    laravext.app.vue_nexus_app?.unmount();
                    
                    nexusApp.mount(nexusElement);

                    if(scrollState != null){
                        window.scrollTo(scrollState.x ?? 0, scrollState.y ?? 0);
                    }

                    window.__laravext.app.vue_nexus_app = nexusApp;
                }).catch((error) => {
                    console.error(`Error loading page at ${nexusComponentPath}:`, error);
                    throw error;
                });
            }
        });
    }

    if (strandsResolver) {
        const strands = findStrands();

        if(typeof window.__laravext.app?.vue_strand_apps == 'undefined') {
            window.__laravext.app.vue_strand_apps = {};
        }

        let strandApps = window.__laravext.app.vue_strand_apps

        strands.forEach((strandElement) => {
            const strandComponentPath = strandElement.getAttribute('strand-component');
            const strandData = JSON.parse(strandElement.getAttribute('strand-data'));

            if (strandComponentPath) {
                strandsResolver(strandComponentPath).then((StrandComponent) => {
                    let strand = StrandComponent.default;
                    let strandId = strandElement.getAttribute('id');

                    let strandApp = createApp(StrandComponent.default, { laravext, ...strandData });
                    
                    if (reverseSetupOrder && setupStrand) {
                        strandApp = setupStrand({ strand, laravext, strandData });
                    }

                    if (setup) {
                        strandApp = setup({ app: strandApp, laravext });
                    }

                    if (!reverseSetupOrder && setupStrand) {
                        strandApp = setupStrand({ strand, laravext, strandData });
                    }

                    strandApp.mixin({
                        provide: mixins,
                        methods: mixins
                    })

                    if(strandApps[strandId]) {
                        strandApps[strandId].unmount();
                    }

                    strandApp.mount(strandElement);

                    window.__laravext.app.vue_strand_apps[strandId] = strandApp;
                }).catch((error) => {
                    console.error(`Error loading component at ${strandComponentPath}:`, error);
                });
            }
        });
    }
}