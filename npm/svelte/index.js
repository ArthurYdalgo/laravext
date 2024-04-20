

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
        const nexus_tags = findNexus();
        nexus_tags.forEach((nexusElement) => {
            if (nexusComponentPath) {
                nexusResolver(nexusComponentPath).then(async (NexusModule) => {
                    if(!isEnvProduction){
                        console.log(`Loading page at ${nexusComponentPath}`);
                    }
                    
                    const { default: Component } = NexusModule;

                    nexusElement.innerHTML = '';
                    new Component({
                        target: nexusElement,
                        props: {
                            laravext
                        },
                    })


                    // if(!isEnvProduction){
                    //     console.log(`Page at ${nexusComponentPath} loaded successfully`, {
                    //         NexusModule
                    //     });
                    // }   

                    // let conventions = [
                    //     'error',
                    //     'middleware',
                    //     'layout',
                    //     'loading'
                    // ];

                    // for (let i = 0; i < conventions.length; i++) {
                    //     if (laravext?.nexus?.[conventions[i]]) {
                    //         try {
                    //             if (!isEnvProduction) {
                    //                 console.log(`Loading convention ${conventions[i]} at ${laravext?.nexus?.[conventions[i]]}`)
                    //             };
                    //             let Convention = await nexusResolver(laravext?.nexus?.[conventions[i]]);
                    //             if(!isEnvProduction){
                    //                 console.log(`Convention ${conventions[i]} at ${laravext?.nexus?.[conventions[i]]} loaded successfully`, {
                    //                     Convention
                    //                 });
                    //             }

                    //             nexus = <Convention.default laravext={laravext}>{nexus}</Convention.default>;
                    //         } catch (error) {
                    //             console.error(`Error loading convention ${conventions[i]} at ${laravext?.nexus?.[conventions[i]]}:`, error);
                    //         }
                    //     }
                    // }

                    // createRoot(nexusElement).render(nexus);
                })
                    .catch((error) => {
                        console.error(`Error loading page at ${nexusComponentPath}:`, error);
                    });
            }
        });
    }

    // if (strandsResolver) {
    //     const strands = findStrands();
    //     strands.forEach((strandElement) => {
    //         const strandComponentPath = strandElement.getAttribute('strand-component');
    //         const strandData = JSON.parse(strandElement.getAttribute('strand-data'));

    //         if (strandComponentPath) {
    //             strandsResolver(strandComponentPath).then((StrandModule) => {
    //                 createRoot(strandElement).render(<StrandModule.default laravext={{ ...laravext, ...strandData }} />);
    //             })
    //                 .catch((error) => {
    //                     console.error(`Error loading component at ${strandComponentPath}:`, error);
    //                 });
    //         }
    //     });
    // }
}