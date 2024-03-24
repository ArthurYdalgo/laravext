export async function resolvePageComponent(path, pages) {
    const page = pages[path];
    if (typeof page === 'undefined') {
        throw new Error(`Page not found: ${path}`);
    }

    return typeof page === 'function' ? page() : page;
}

export function findNexus() {
    // find every section where the "section-type" value is "laraext-nexus-section"
    const nexusSection = document.querySelectorAll('section[section-type="laravext-nexus-section"]');

    return nexusSection;
}

export function findStrands(){
    const strands = document.querySelectorAll('section[section-type="laravext-strand-section"]');

    return strands;
}

export function createLaravextApp({ nexusDir = './pages', strandsDir = './strands' }) {
    const laravext = window.__laravext;

    const nexusComponentPath = laravext?.nexus?.component.replaceAll('\\', '/');

    const nexus = findNexus();
    
    const strands = findStrands();

    // for each nexus section, create a laravext app
    
    nexus.forEach((nexusElement) => {
        import(`${nexusDir}/${nexusComponentPath}`).then((NexusModule) => {
            createRoot(nexusElement).render(<NexusModule.default />);  
        })
        .catch((error) => {
            console.error(`Error loading component at ${nexusComponentPath}:`, error);
        });
    });

    strands.forEach((strandElement) => {
        const strandComponentPath = strandElement.getAttribute('strand-component');

        import(`${strandsDir}/${strandComponentPath}`).then((StrandModule) => {
            createRoot(strandElement).render(<StrandModule.default />);  
        })
        .catch((error) => {
            console.error(`Error loading component at ${nexusComponentPath}:`, error);
        });
    });
}