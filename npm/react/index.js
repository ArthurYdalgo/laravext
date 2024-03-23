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

export function createLaravextApp({ title , pages = {} }) {
    return {
        resolvePageComponent: async (path) => resolvePageComponent(path, pages),
        title,
        path,
        pages,
    };
    
}