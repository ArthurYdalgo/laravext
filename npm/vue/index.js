import { createApp, defineAsyncComponent, defineComponent } from 'vue';


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
                nexusResolver(nexusComponentPath).then((NexusComponent) => {
                    if(!isEnvProduction){
                        console.log(`Loading page at ${nexusComponentPath}`);
                    }

                    const NexusComponentAsync = defineAsyncComponent(() => NexusComponent);
                    let app = createApp(NexusComponentAsync, { laravext });
                    
                    if(!isEnvProduction){
                        console.log(`Page at ${nexusComponentPath} loaded successfully`);
                    }

                    let conventions = [
                        'error',
                        'middleware',
                        'layout',
                        'loading'
                    ];

                    conventions.forEach(async (convention) => {
                        if (laravext?.nexus?.[convention]) {
                            try {
                                if (!isEnvProduction) {
                                    console.log(`Loading convention ${convention} at ${laravext?.nexus?.[convention]}`)
                                };
                                const ConventionComponent = await nexusResolver(laravext?.nexus?.[convention]);
                                app.component(convention, ConventionComponent);

                                if(!isEnvProduction){
                                    console.log(`Convention ${convention} loaded successfully`);
                                }
                            } catch (error) {
                                console.error(`Error loading convention ${convention}:`, error);
                            }
                        }
                    });

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
                    const app = createApp(StrandComponent.default);
                    app.mount(strandElement);
                }).catch((error) => {
                    console.error(`Error loading component at ${strandComponentPath}:`, error);
                });
            }
        });
    }
}
