import { createApp, h } from 'vue';

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

    if (strandsResolver) {
        const strands = findStrands();
        strands.forEach((strandElement) => {
            const strandComponentPath = strandElement.getAttribute('strand-component');
            const strandData = JSON.parse(strandElement.getAttribute('strand-data'));

            if (strandComponentPath) {
                strandsResolver(strandComponentPath).then((StrandComponent) => {
                    
                    // Create a new Vue application instance with the resolved component
                    const app = createApp({
                        render: () => h(StrandComponent.default, strandData)
                    });
                    // Mount the Vue application to the current strandElement
                    app.mount(strandElement);


                }).catch((error) => {
                    console.error(`Error loading component at ${strandComponentPath}:`, error);
                });
            }
        });
    }
}
