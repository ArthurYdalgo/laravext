import { createApp, defineComponent, h } from 'vue';

export const laravext = () => {
    return window.__laravext;
}

export const nexus = () => {
    return laravext().nexus;
}

export const nexusProps = () => {
    return nexus().props;
}

export const sharedProps = () => {
    return laravext().shared_props;
}

export const routeParams = () => {
    return laravext().route_params;
}

export const routeName = () => {
    return laravext().route_name;
}

export const queryParams = () => {
    return laravext().query_params;
}

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

export const Head = defineComponent({
    props: {
        title: String
    },
    mounted() {
        if(this.title){
            document.title = this.title;
        }
    },
    render() {
        return null;
    }
});

export function createLaravextApp({ nexusResolver, strandsResolver, uses = [], conventions = [
    'error',
    'loading',
    'layout',
    'middleware',
] }) {
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
                        console.debug(`Loading page at ${nexusComponentPath}`);
                        console.debug(`Page at ${nexusComponentPath} loaded successfully`);
                    }

                    let pageComponent = NexusComponent.default

                    let renderer = () => h(pageComponent, { laravext }, {
                        props: () => ({
                            laravext
                        }),
                    });

                    conventions = conventions.filter(convention => convention !== 'page');

                    for (let i = 0; i < conventions.length; i++) {
                        if (laravext?.nexus?.[conventions[i]]) {
                            try {
                                if (!isEnvProduction) {
                                    console.debug(`Loading convention ${conventions[i]} at ${laravext?.nexus?.[conventions[i]]}`)
                                };
                                let conventionComponent = (await nexusResolver(laravext?.nexus?.[conventions[i]])).default;
                                if (!isEnvProduction) {
                                    console.debug(`Convention ${conventions[i]} at ${laravext?.nexus?.[conventions[i]]} loaded successfully`);
                                }

                                const previousRenderer = renderer;
                                renderer = () => h(conventionComponent, { laravext }, {
                                    default: () => previousRenderer(),
                                    props: () => ({
                                        laravext
                                    })
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

                    for (let i = 0; i < uses.length; i++) {
                        app.use(uses[i].plugin, uses[i].options ?? {});
                    }

                    app.mount(nexusElement);
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
