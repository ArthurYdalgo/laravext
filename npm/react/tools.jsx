import { laravext } from "./index";
import { createRoot } from 'react-dom/client';
import { renderToString , renderToStaticMarkup} from 'react-dom/server';

export function findNexus() {
    const nexusSection = document.querySelectorAll('section[section-type="laravext-nexus-section"]');
    return nexusSection;
}

export function findStrands() {
    const strands = document.querySelectorAll('section[section-type="laravext-strand-section"]');
    return strands;
}

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

export function clientRender() {
    const laravextPageData = laravext().page_data;

    let nexusResolver = window.__laravext.app.nexusResolver;
    let strandsResolver = window.__laravext.app.strandsResolver;
    let conventions = window.__laravext.app.conventions;

    if (nexusResolver) {
        const nexusComponentPath = laravextPageData?.nexus?.page?.replaceAll('\\', '/');
        const nexus_tags = findNexus();
        nexus_tags.forEach((nexusElement) => {
            if (nexusComponentPath) {
                nexusResolver(nexusComponentPath).then(async (NexusModule) => {
                    if (!isEnvProduction()) {
                        console.debug(`Loading page at ${nexusComponentPath}`);
                    }
                    let nexus = <NexusModule.default laravext={laravextPageData} />
                    if (!isEnvProduction()) {
                        console.debug(`Page at ${nexusComponentPath} loaded successfully`, {
                            NexusModule
                        });
                    }

                    conventions = conventions.filter(convention => convention !== 'page');

                    for (let i = 0; i < conventions.length; i++) {
                        if (laravextPageData?.nexus?.[conventions[i]]) {
                            try {
                                if (!isEnvProduction()) {
                                    console.debug(`Loading convention ${conventions[i]} at ${laravextPageData?.nexus?.[conventions[i]]}`)
                                };
                                let Convention = await nexusResolver(laravextPageData?.nexus?.[conventions[i]]);
                                if (!isEnvProduction()) {
                                    console.debug(`Convention ${conventions[i]} at ${laravextPageData?.nexus?.[conventions[i]]} loaded successfully`, {
                                        Convention
                                    });
                                }

                                nexus = <Convention.default laravext={laravextPageData}>{nexus}</Convention.default>;
                            } catch (error) {
                                console.error(`Error loading convention ${conventions[i]} at ${laravextPageData?.nexus?.[conventions[i]]}:`, error);
                            }
                        }
                    }

                    let root = window.__laravext.app?.react_root ?? createRoot(nexusElement);

                    root.render(nexus);

                    if (!window.__laravext.app?.react_root) {
                        window.__laravext.app.react_root = root;
                    }
                })
                    .catch((error) => {
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
                strandsResolver(strandComponentPath).then((StrandModule) => {
                    // pass strand data to component
                    console.debug(strandData);
                    createRoot(strandElement).render(<StrandModule.default laravext={{ ...laravextPageData }} {...strandData} />);
                })
                    .catch((error) => {
                        console.error(`Error loading component at ${strandComponentPath}:`, error);
                    });
            }
        });
    }
}

export async function serverRender() {
    const laravextPageData = laravext().page_data;

    let nexusResolver = window.__laravext.app.nexusResolver;
    let strandsResolver = window.__laravext.app.strandsResolver;
    let conventions = window.__laravext.app.conventions;


    if (nexusResolver) {
        const nexusComponentPath = laravextPageData?.nexus?.page?.replaceAll('\\', '/');
        const nexus_tags = findNexus();
        for (let i = 0; i < nexus_tags.length; i++) {
            let nexusElement = nexus_tags[i];

            if (nexusComponentPath) {
                let NexusModule = await nexusResolver(nexusComponentPath)
                if (!isEnvProduction()) {
                    console.debug(`Loading page at ${nexusComponentPath}`);
                }
                let nexus = <NexusModule.default laravext={laravextPageData} />
                if (!isEnvProduction()) {
                    console.debug(`Page at ${nexusComponentPath} loaded successfully`, {
                        NexusModule
                    });
                }

                conventions = conventions.filter(convention => convention !== 'page');

                for (let i = 0; i < conventions.length; i++) {
                    if (laravextPageData?.nexus?.[conventions[i]]) {
                        try {
                            
                            if (!isEnvProduction()) {
                                console.debug(`Loading convention ${conventions[i]} at ${laravextPageData?.nexus?.[conventions[i]]}`)
                            };
                            let Convention = await nexusResolver(laravextPageData?.nexus?.[conventions[i]]);
                            if (!isEnvProduction()) {
                                console.debug(`Convention ${conventions[i]} at ${laravextPageData?.nexus?.[conventions[i]]} loaded successfully`, {
                                    Convention
                                });
                            }

                            nexus = <Convention.default laravext={laravextPageData}>{nexus}</Convention.default>;
                        } catch (error) {
                            console.error(`Error loading convention ${conventions[i]} at ${laravextPageData?.nexus?.[conventions[i]]}:`, error);
                        }
                    }
                }

                let staticMarkup = renderToString(nexus);

                nexusElement.innerHTML = staticMarkup;


            }
        }
    }

    if (strandsResolver) {
        const strands = findStrands();
        for (let i = 0; i < strands.length; i++) {
            let strandElement = strands[i];
            const strandComponentPath = strandElement.getAttribute('strand-component');
            const strandData = JSON.parse(strandElement.getAttribute('strand-data'));

            if (strandComponentPath) {
                let StrandModule = await strandsResolver(strandComponentPath)
                // pass strand data to component
                let staticMarkup = renderToString(<StrandModule.default laravext={{ ...laravextPageData }} {...strandData} />);
                strandElement.innerHTML = staticMarkup;
            }
        }
    }
}