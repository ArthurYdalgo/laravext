import { createApp, defineComponent, h } from 'vue';
import axios from 'axios';

export const laravext = () => {
    return window.__laravext;
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
        if (this.title) {
            document.title = this.title;
        }
    },
    render() {
        return null;
    }
});

export function visit(url) {
    axios.get(url, {
        headers: {
            'Accept': 'text/html, application/xhtml+xml',
            'X-Requested-With': 'XMLHttpRequest',
            'Cache-Control': 'no-cache, no-store, must-revalidate', // Prevent caching
            'Pragma': 'no-cache', // For older HTTP/1.0 servers
            'Expires': '0', // Proxies
            'X-Laravext': true,
            'X-Laravext-Version': version(),
            'X-Laravext-Root-View': laravextPageData().root_view,
        },
    }).then((response) => {
        if (!response.headers.get('X-Laravext')) {
            window.location.href = url;
            return;
        }

        let data = response.data;
        if (data.action == 'redirect' || !history.pushState) {
            window.location.href = data.url;
            return;
        }

        window.__laravext.page_data = data.laravext_page_data;

        try {
            render();
            history.pushState({}, null, url);
        } catch (error) {
            console.error('Error updating page data:', error);
            window.location.href = url;
        }
    })
}

window.addEventListener("popstate", function(event) {
    // Update the content based on the state object
    this.window.location.href = event.target.location.href;
});

export function render() {
    const laravextPageData = laravext().page_data;
    const env = import.meta.env.VITE_APP_ENV ?? 'production';
    const isEnvProduction = !['development', 'local'].includes(env);

    let nexusResolver = window.__laravext.app.nexusResolver;
    let strandsResolver = window.__laravext.app.strandsResolver;
    let uses = window.__laravext.app.uses;
    let conventions = window.__laravext.app.conventions;

    if (nexusResolver) {
        const nexusComponentPath = laravextPageData?.nexus?.page?.replaceAll('\\', '/');
        const nexusTags = findNexus();
        nexusTags.forEach((nexusElement) => {
            if (nexusComponentPath) {
                nexusResolver(nexusComponentPath).then(async (NexusComponent) => {
                    if (!isEnvProduction) {
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
                                if (!isEnvProduction) {
                                    console.debug(`Loading convention ${conventions[i]} at ${laravextPageData?.nexus?.[conventions[i]]}`)
                                };
                                let conventionComponent = (await nexusResolver(laravextPageData?.nexus?.[conventions[i]])).default;
                                if (!isEnvProduction) {
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

                    for (let i = 0; i < uses.length; i++) {
                        app.use(uses[i].plugin, uses[i].options ?? {});
                    }

                    if (laravext().app.vue) {
                        laravext().app.vue.unmount();
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

export function createLaravextApp({ nexusResolver, strandsResolver, uses = [], conventions = [
    'error',
    'loading',
    'layout',
    'middleware',
] }) {
    window.__laravext.app = {
        nexusResolver,
        strandsResolver,
        uses,
        conventions,
    }

    render();
}
