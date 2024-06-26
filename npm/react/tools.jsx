
export async function resolveComponent(path, pages) {
    const page = pages[path];
    if (typeof page === 'undefined') {
        throw new Error(`Page not found: ${path}`);
    }

    return typeof page === 'function' ? page() : page;
}

export function isEnvProduction() {
    return !['development', 'local'].includes(import.meta.env.VITE_APP_ENV ?? 'production');
}