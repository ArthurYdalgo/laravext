import { createRoot } from "react-dom/client";
import LaravextContext from "./LaravextContext";

export function findNexus(doc = null) {
    if (typeof window !== "undefined") {
        doc = document;
    }

    const nexusSection = doc.querySelectorAll(
        'section[section-type="laravext-nexus-section"]'
    );
    return nexusSection;
}

export function findStrands(doc = null) {
    if (typeof window !== "undefined") {
        doc = document;
    }

    const strands = doc.querySelectorAll(
        'section[section-type="laravext-strand-section"]'
    );
    return strands;
}

export async function resolveComponent(path, pages) {
    const page = pages[path];
    if (typeof page === "undefined") {
        throw new Error(`Page not found: ${path}`);
    }

    return typeof page === "function" ? page() : page;
}

export function isEnvProduction() {
    return !["development", "local"].includes(
        import.meta.env.VITE_APP_ENV ?? "production"
    );
}

export function shouldLinkClickEventBeIntercepted(event) {
    const isLink = event.currentTarget.tagName.toLowerCase() === "a";

    return !(
        (event.target && event?.target.isContentEditable) ||
        event.defaultPrevented ||
        (isLink && event.altKey) ||
        (isLink && event.ctrlKey) ||
        (isLink && event.metaKey) ||
        (isLink && event.shiftKey) ||
        (isLink && "button" in event && event.button !== 0)
    );
}

export function clientRender(pageData = null, scrollState = null) {
    const laravextPageData = pageData ?? window.__laravext.page_data;

    let nexusResolver = window.__laravext.app.nexusResolver;
    let strandsResolver = window.__laravext.app.strandsResolver;
    let conventions = window.__laravext.app.conventions;
    let beforeSetup = window.__laravext.app.beforeSetup;
    let setup = window.__laravext.app.setup;
    let setupNexus = window.__laravext.app.setupNexus;
    let setupStrand = window.__laravext.app.setupStrand;
    let reverseSetupOrder = window.__laravext.app.reverseSetupOrder;

    if (beforeSetup) {
        beforeSetup({ laravext: window.__laravext });
    }

    if (nexusResolver) {
        const nexusComponentPath = laravextPageData?.nexus?.page?.replaceAll(
            "\\",
            "/"
        );
        const nexus_tags = findNexus();

        // Although you're not supposed to have more than one nexus tag, it will render all of them.
        nexus_tags.forEach((nexusElement) => {
            if (nexusComponentPath) {
                nexusResolver(nexusComponentPath)
                    .then(async (NexusModule) => {
                        if (!isEnvProduction()) {
                            console.debug(
                                `Loading page at ${nexusComponentPath}`
                            );
                        }
                        let nexus = (
                            <NexusModule.default laravext={laravextPageData} />
                        );
                        if (!isEnvProduction()) {
                            console.debug(
                                `Page at ${nexusComponentPath} loaded successfully`
                            );
                        }

                        conventions = conventions.filter(
                            (convention) => convention !== "page"
                        );

                        for (let i = 0; i < conventions.length; i++) {
                            if (laravextPageData?.nexus?.[conventions[i]]) {
                                try {
                                    if (!isEnvProduction()) {
                                        console.debug(
                                            `Loading convention ${
                                                conventions[i]
                                            } at ${
                                                laravextPageData?.nexus?.[
                                                    conventions[i]
                                                ]
                                            }`
                                        );
                                    }
                                    let Convention = await nexusResolver(
                                        laravextPageData?.nexus?.[
                                            conventions[i]
                                        ]
                                    );
                                    if (!isEnvProduction()) {
                                        console.debug(
                                            `Convention ${conventions[i]} at ${
                                                laravextPageData?.nexus?.[
                                                    conventions[i]
                                                ]
                                            } loaded successfully`
                                        );
                                    }

                                    nexus = (
                                        <Convention.default
                                            laravext={laravextPageData}
                                        >
                                            {nexus}
                                        </Convention.default>
                                    );
                                } catch (error) {
                                    console.error(
                                        `Error loading convention ${
                                            conventions[i]
                                        } at ${
                                            laravextPageData?.nexus?.[
                                                conventions[i]
                                            ]
                                        }:`,
                                        error
                                    );
                                }
                            }
                        }

                        let nexusRoot =
                            window.__laravext.app?.react_nexus_root ??
                            createRoot(nexusElement);

                        if (reverseSetupOrder && setupNexus) {
                            nexus = setupNexus({
                                nexus,
                                laravext: window.__laravext,
                            });
                        }

                        if (setup) {
                            nexus = setup({
                                component: nexus,
                                laravext: window.__laravext,
                            });
                        }

                        if (!reverseSetupOrder && setupNexus) {
                            nexus = setupNexus({
                                nexus,
                                laravext: window.__laravext,
                            });
                        }

                        let laravext = window.__laravext;
                        laravext.page_data = laravextPageData;

                        nexus = (
                            <LaravextContext.Provider value={laravext}>
                                {nexus}
                            </LaravextContext.Provider>
                        );

                        nexusRoot.render(nexus);

                        window.__laravext.app.react_nexus_root = nexusRoot;
                        window.__laravext.page_data = laravextPageData;

                        if(scrollState != null){
                            window.scrollTo(scrollState.x ?? 0, scrollState.y ?? 0);
                        }
                    })
                    .catch((error) => {
                        console.error(
                            `Error loading page at ${nexusComponentPath}:`,
                            error
                        );
                    });
            }
        });
    }

    if (strandsResolver) {
        const strands = findStrands();

        if (typeof window.__laravext.app?.react_strand_roots == "undefined") {
            window.__laravext.app.react_strand_roots = {};
        }

        let strandRoots = window.__laravext.app.react_strand_roots;

        strands.forEach((strandElement) => {
            const strandComponentPath =
                strandElement.getAttribute("strand-component");
            const strandData = JSON.parse(
                strandElement.getAttribute("strand-data")
            );

            if (strandComponentPath) {
                strandsResolver(strandComponentPath)
                    .then((StrandModule) => {
                        // pass strand data to component
                        let strand = (
                            <StrandModule.default
                                laravext={{ ...laravextPageData }}
                                {...strandData}
                            />
                        );
                        let strandId = strandElement.getAttribute("id");

                        let strandRoot = strandRoots[strandId];

                        if (typeof strandRoot == "undefined") {
                            strandRoot = createRoot(strandElement);
                        }

                        if (reverseSetupOrder && setupStrand) {
                            strand = setupStrand({
                                strand,
                                laravext: laravextPageData,
                                strandData,
                            });
                        }

                        if (setup) {
                            strand = setup({
                                component: strand,
                                laravext: laravextPageData,
                            });
                        }

                        if (!reverseSetupOrder && setupStrand) {
                            strand = setupStrand({
                                strand,
                                laravext: laravextPageData,
                                strandData,
                            });
                        }

                        let laravext = window.__laravext;
                        laravext.page_data = laravextPageData;

                        strand = (
                            <LaravextContext.Provider value={laravext}>
                                {strand}
                            </LaravextContext.Provider>
                        );

                        strandRoot.render(strand);

                        window.__laravext.app.react_strand_roots[strandId] =
                            strandRoot;

                        window.__laravext.page_data = laravextPageData;
                    })
                    .catch((error) => {
                        console.error(
                            `Error loading component at ${strandComponentPath}:`,
                            error
                        );
                    });
            }
        });
    }
}
