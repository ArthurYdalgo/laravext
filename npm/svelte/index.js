export async function resolveComponent(path, pages) {
    const page = pages[path];
    if (!page) {
        throw new Error(`Page not found: ${path}`);
    }
    return typeof page === 'function' ? page() : page;
}

export function findStrands() {
    const strands = document.querySelectorAll('section[section-type="laravext-strand-section"]');

    return strands;
}

// Helper to create nested structure
function createNestedStructure(components, target) {
    let currentTarget = target;

    // Iterate in reverse order since the last component should wrap all previous
    components.reverse().forEach(async (Component) => {
        const element = document.createElement('div');
        currentTarget.appendChild(element);
        new Component({ target: element });
        currentTarget = element; // Update the target to be the inner element
    });
}

export function createLaravextApp({ nexusResolver, strandsResolver }) {
    const laravext = window.__laravext;
    const env = import.meta.env.VITE_APP_ENV ?? 'production';
    const isEnvProduction = !['development', 'local'].includes(env);

    document.querySelectorAll('section[section-type="laravext-nexus-section"]').forEach(async (nexusElement) => {
        const nexusComponentPath = laravext?.nexus?.page?.replaceAll('\\', '/');

        if (!nexusComponentPath) return;

        try {
            let NexusModule = (await nexusResolver(nexusComponentPath)).default;


            let componentsToLoad = [NexusModule];
            let conventions = ['error', 'middleware', 'layout', 'loading'];

            // Add conventions to the components list if they are configured
            for (let conventionName of conventions) {
                if (laravext?.nexus?.[conventionName]) {
                    let ConventionComponent = (await nexusResolver(laravext.nexus[conventionName])).default;
                    componentsToLoad.push(ConventionComponent);
                }
            }

            // Create the nested structure of components
            createNestedStructure(componentsToLoad, nexusElement);

            if (!isEnvProduction) {
                console.log(`Loaded and wrapped: ${nexusComponentPath}`);
            }
        } catch (error) {
            console.error(`Error setting up components for ${nexusComponentPath}:`, error);
        }
    });

    if (strandsResolver) {
        const strands = findStrands();
        
        strands.forEach((strandElement) => {
            const strandComponentPath = strandElement.getAttribute('strand-component');
            const strandData = JSON.parse(strandElement.getAttribute('strand-data'));

            if (strandComponentPath) {
                strandsResolver(strandComponentPath).then((StrandModule) => {
                    let strandComponent = StrandModule.default;
                    new strandComponent({
                        target: strandElement,
                        props: {
                            laravext: { ...laravext, ...strandData }
                        }
                    })
                })
                    .catch((error) => {
                        console.error(`Error loading component at ${strandComponentPath}:`, error);
                    });
            }
        });
    }
}