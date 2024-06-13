import { laravext } from "./index";
import {defineComponent, createApp, h} from 'vue';

export function findNexus() {
    const nexusSection = document.querySelectorAll('section[section-type="laravext-nexus-section"]');
    return nexusSection;
}

export function findStrands() {
    const strands = document.querySelectorAll('section[section-type="laravext-strand-section"]');
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


export function render() {
    const laravextPageData = laravext().page_data;

    let nexusResolver = window.__laravext.app.nexusResolver;
    let strandsResolver = window.__laravext.app.strandsResolver;
    let uses = window.__laravext.app.uses();
    let conventions = window.__laravext.app.conventions;

    if (nexusResolver) {
        const nexusComponentPath = laravextPageData?.nexus?.page?.replaceAll('\\', '/');
        const nexusTags = findNexus();
        nexusTags.forEach((nexusElement) => {
            if (nexusComponentPath) {
                nexusResolver(nexusComponentPath).then(async (NexusComponent) => {
                    if (!isEnvProduction()) {
                        console.debug(`Loading page at ${nexusComponentPath}`);
                        console.debug(`Page at ${nexusComponentPath} loaded successfully`);
                    }

                    let pageComponent = NexusComponent.default

                    let renderer = () => h(pageComponent, { laravext: laravextPageData }, {
                        props: () => ({
                            laravext: laravextPageData
                        }),
                    });

                    conventions = conventions.filter(convention => convention !== 'page');

                    for (let i = 0; i < conventions.length; i++) {
                        if (laravextPageData?.nexus?.[conventions[i]]) {
                            try {
                                if (!isEnvProduction()) {
                                    console.debug(`Loading convention ${conventions[i]} at ${laravextPageData?.nexus?.[conventions[i]]}`)
                                };
                                let conventionComponent = (await nexusResolver(laravextPageData?.nexus?.[conventions[i]])).default;
                                if (!isEnvProduction()) {
                                    console.debug(`Convention ${conventions[i]} at ${laravextPageData?.nexus?.[conventions[i]]} loaded successfully`);
                                }

                                const previousRenderer = renderer;
                                renderer = () => h(conventionComponent, { laravext: laravextPageData }, {
                                    default: () => previousRenderer(),
                                    props: () => ({
                                        laravext: laravextPageData
                                    })
                                });
                            } catch (error) {
                                console.error(`Error loading convention ${conventions[i]} at ${laravextPageData?.nexus?.[conventions[i]]}:`, error);
                            }
                        }
                    }

                    const rootComponent = defineComponent({
                        render() {
                            return renderer()
                        }
                    });

                    const app = createApp(rootComponent);
                    
                    laravext().app.vue?.unmount();
                    
                    for (let i = 0; i < uses.length; i++) {
                        console.log(uses[i])
                        app.use(uses[i].plugin, uses[i].options ?? {});
                    }
                    
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
                    const app = createApp(StrandComponent.default, { laravext, ...strandData });
                    app.mount(strandElement);
                }).catch((error) => {
                    console.error(`Error loading component at ${strandComponentPath}:`, error);
                });
            }
        });
    }
}