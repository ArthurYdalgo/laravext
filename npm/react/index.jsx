import React from "react";
import { setupProgress } from './progress.jsx';
import { clientRender, findNexus, findStrands, shouldLinkClickEventBeIntercepted } from './tools.jsx';
import { renderToString } from 'react-dom/server';
import laravext from './laravext';
import LaravextContext from './LaravextContext';
import { visit } from './router.jsx';

if (typeof window !== 'undefined') {
    window.addEventListener("popstate", function (event) {
        if(window.__laravext.app.disablePushedStateData()){
            window.location.href = window.location.href;
            return;
        }

        try {
            clientRender(event.state.laravext_page_data, event.state.scroll_state ?? 0);

        } catch (error) {
            console.error('Error updating page data:', error);
            window.location.href = window.location.href;
        }
    });
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

export function Head({ title }) {
    if (title) {
        document.title = title;
    }
    return null;
}

export function Link({ href, preserveScroll = false, redirectToUrlIntended = true, children, ...props }) {
    return (
      <a
        href={href}
        onClick={(event) => {
          if (shouldLinkClickEventBeIntercepted(event)) {
            event.preventDefault();
            visit(href, {
                preserveScroll,
                redirectToUrlIntended
            });
          }
        }}
        {... props}
      >
        {children}
      </a>
    );
  }

export function createLaravextApp({ nexusResolver, strandsResolver, conventions = [
    'error',
    'layout',
    'middleware',
], progress = {}, beforeSetup = null, setup = null, setupNexus = null, setupStrand = null, reverseSetupOrder = false, disablePushedStateData = () => false}) {

    window.__laravext.app = {
        nexusResolver,
        strandsResolver,
        conventions,
        beforeSetup,
        setup,
        setupNexus,
        setupStrand,
        reverseSetupOrder,
        disablePushedStateData
    }

    if (progress) {
        setupProgress(progress);
    }

    if(history?.pushState){
        history.pushState({ laravext_page_data: (disablePushedStateData() ? window.__laravext.page_data : {}) }, '', window.location.href);
    }

    clientRender();
}

export async function createLaravextSsrApp({ nexusResolver, strandsResolver, conventions = [
    'error',
    'layout',
    'middleware',
], laravext, document, render = null, beforeSetup = null, setup = null, setupNexus = null, setupStrand = null, reverseSetupOrder = false }) {
    laravext.app = {}

    if (beforeSetup) {
        beforeSetup({ laravext });
    }

    if (nexusResolver) {
        const nexusComponentPath = laravext?.page_data?.nexus?.page?.replaceAll('\\', '/');
        const nexusTags = findNexus(document);

        for (let i = 0; i < nexusTags.length; i++) {
            let nexusElement = nexusTags[i];

            if (nexusComponentPath) {
                let NexusModule = await nexusResolver(nexusComponentPath)
                
                let nexus = <NexusModule.default laravext={laravext} />

                conventions = conventions.filter(convention => convention !== 'page');

                for (let i = 0; i < conventions.length; i++) {
                    if (laravext?.page_data?.nexus?.[conventions[i]]) {
                        try {

                            let Convention = await nexusResolver(laravext?.page_data?.nexus?.[conventions[i]]);

                            nexus = <Convention.default laravext={laravext}>{nexus}</Convention.default>;
                        } catch (error) {
                            console.error(`Error loading convention ${conventions[i]} at ${laravext?.page_data?.nexus?.[conventions[i]]}:`, error);
                        }
                    }
                }

                if(reverseSetupOrder && setupNexus){
                    nexus = setupNexus({ nexus, laravext });
                }

                if (setup) {
                    nexus = setup({ component: nexus, laravext });
                }

                if(!reverseSetupOrder && setupNexus){
                    nexus = setupNexus({ nexus, laravext });
                }

                nexus = <LaravextContext.Provider value={laravext}>{nexus}</LaravextContext.Provider>;
                let renderedComponent = render ? render(nexus) : renderToString(nexus);
                nexusElement.innerHTML = renderedComponent;
            }
        }
    }

    if (strandsResolver) {
        const strands = findStrands(document);
        for (let i = 0; i < strands.length; i++) {
            let strandElement = strands[i];
            const strandComponentPath = strandElement.getAttribute('strand-component');
            const strandData = JSON.parse(strandElement.getAttribute('strand-data').replace(/'/g, '"'));

            if (strandComponentPath) {
                let StrandModule = await strandsResolver(strandComponentPath)

                let strand = <StrandModule.default laravext={{ ...laravext }} {...strandData} />

                if(reverseSetupOrder && setupStrand){
                    strand = setupStrand({ strand, laravext, strandData });
                }

                if (setup) {
                    strand = setup({ component: strand, laravext });
                }

                if(!reverseSetupOrder && setupStrand){
                    strand = setupStrand({ strand, laravext, strandData });
                }

                strand = <LaravextContext.Provider value={laravext}>{strand}</LaravextContext.Provider>

                let renderedComponent = render ? render(strand) : renderToString(strand);
                strandElement.innerHTML = renderedComponent;
            }
        }
    }
}

export { default as laravext } from './laravext';