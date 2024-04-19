import { createApp, defineComponent, h, compile, defineAsyncComponent } from 'vue';


export async function resolveComponent(path, pages) {
    const page = pages[path];
    if (typeof page === 'undefined') {
        throw new Error(`Page not found: ${path}`);
    }

    return typeof page === 'function' ? page() : page;
}

export function findNexus() {
    const nexusSection = document.querySelectorAll('section[section-type="laravext-nexus-section"]');
    return nexusSection;
}

export function findStrands() {
    const strands = document.querySelectorAll('section[section-type="laravext-strand-section"]');
    return strands;
}

export function createLaravextApp({ nexusResolver, strandsResolver }) {
    const laravext = window.__laravext;
    const env = import.meta.env.VITE_APP_ENV ?? 'production';
    const isEnvProduction = !['development', 'local'].includes(env);

    if (nexusResolver) {
        const nexusComponentPath = laravext?.nexus?.page?.replaceAll('\\', '/');
        const nexusTags = findNexus();
        nexusTags.forEach((nexusElement) => {
            if (nexusComponentPath) {
                nexusResolver(nexusComponentPath).then(async (NexusComponent) => {
                    if (!isEnvProduction) {
                        console.log(`Loading page at ${nexusComponentPath}`);
                        console.log(`Page at ${nexusComponentPath} loaded successfully`);
                    }

                    // let middlewareComponent = (await nexusResolver(laravext.nexus['middleware'])).default;
                    // let layoutComponent = (await nexusResolver(laravext.nexus['layout'])).default;
                    let pageComponent = NexusComponent.default

                    let renderer = () => h(pageComponent, {laravext});
                    
                    const conventions = [
                        'page',
                        'error',
                        'middleware',
                        'layout',
                        'loading',
                    ];

                    for (let i = 0; i < conventions.length; i++) {
                        if (laravext?.nexus?.[conventions[i]]) {
                            try {
                                if (!isEnvProduction) {
                                    console.log(`Loading convention ${conventions[i]} at ${laravext?.nexus?.[conventions[i]]}`)
                                };
                                let conventionComponent = (await nexusResolver(laravext?.nexus?.[conventions[i]])).default;
                                if(!isEnvProduction){
                                    console.log(`Convention ${conventions[i]} at ${laravext?.nexus?.[conventions[i]]} loaded successfully`);
                                }

                                const previousRenderer = renderer;
                                renderer = () => h(conventionComponent, {laravext}, {
                                    default: () => previousRenderer()
                                });
                            } catch (error) {
                                console.error(`Error loading convention ${conventions[i]} at ${laravext?.nexus?.[conventions[i]]}:`, error);
                            }
                        }
                    }

                    const rootComponent = defineComponent({
                        render() {
                            return renderer()
                        }
                    });
                    

                    const app = createApp(rootComponent);
                    app.mount(nexusElement);
                }).catch((error) => {
                    console.error(`Error loading page at ${nexusComponentPath}:`, error);
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
