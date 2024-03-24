import { createRoot } from 'react-dom/client';
import React from "react";

export async function resolvePageComponent(path, pages) {
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

    if (nexusResolver) {
        const laravext = window.__laravext;
        const nexusComponentPath = laravext?.nexus?.component.replaceAll('\\', '/');
        const nexus = findNexus();
        nexus.forEach((nexusElement) => {
            nexusResolver(nexusComponentPath).then((NexusModule) => {
                createRoot(nexusElement).render(<NexusModule.default />);
            })
                .catch((error) => {
                    console.error(`Error loading component at ${nexusComponentPath}:`, error);
                });
        });
    }

    if (strandsResolver) {
        const strands = findStrands();
        strands.forEach((strandElement) => {
            const strandComponentPath = strandElement.getAttribute('strand-component');

            strandsResolver(strandComponentPath).then((StrandModule) => {
                createRoot(strandElement).render(<StrandModule.default />);
            })
                .catch((error) => {
                    console.error(`Error loading component at ${strandComponentPath}:`, error);
                });
        });
    }
}