import { defineComponent, createSSRApp, h } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { setupProgress } from './progress';
import { clientRender, findNexus, findStrands, shouldLinkClickEventBeIntercepted } from './tools';
import { visit } from './router';

if (typeof window !== 'undefined') {
    window.addEventListener("popstate", function (event) {
        if(window.__laravext.app.disablePushedStateData()){
            window.location.href = window.location.href;
            return;
        }
        
        try {
            window.__laravext.page_data = event.state.laravext_page_data;
    
            clientRender();
        } catch (error) {
            console.error('Error updating page data:', error);
            window.location.href = window.location.href;
        }
    });
}

export const Head = defineComponent({
    props: {
        title: String
    },
    mounted() {
        if (this.title) {
            document.title = this.title;
        }
    },
    render() {
        return null;
    }
});

export const Link = defineComponent({
    props: {
        href: {
            type: String,
            required: true
        },
        preserveScroll: {
            type: Boolean,
            default: false
        },
        redirectToUrlIntended: {
            type: Boolean,
            default: true
        },
        onClick: {
            type: Function,
            default: null
        }
    },
    setup(props) {
        const handleClick = (event) => {
            if (shouldLinkClickEventBeIntercepted(event)) {
                event.preventDefault();
                visit(props.href, {
                    preserveScroll: props.preserveScroll,
                    redirectToUrlIntended: props.redirectToUrlIntended
                });
            }
        }

        return {
            handleClick
        }
    },
    render() {
        return h('a', {
            href: this.href,
            onClick: this.handleClick
        }, this.$slots.default());
    }
});

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
        history.pushState({laravext_page_data: (disablePushedStateData() ? window.__laravext.page_data : {})}, '', window.location.href);
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

    let mixins = {
        '$laravext': () => laravext,
        '$sharedProps': () => laravext.page_data.shared_props,
        '$laravextPageData': () => laravext.page_data,
        '$laravextVersion': () => laravext.page_data.version,
        '$nexus': () => laravext.page_data.nexus,
        '$nexusProps': () => laravext.page_data.nexus.props,
        '$routeParams': () => laravext.page_data.route_params,
        '$routeName': () => laravext.page_data.route_name,
        '$queryParams': () => laravext.page_data.query_params,
    }

    if (nexusResolver) {
        const nexusComponentPath = laravext.page_data?.nexus?.page?.replaceAll('\\', '/');
        const nexusTags = findNexus(document);
        for (let i = 0; i < nexusTags.length; i++) {
            let nexusElement = nexusTags[i];

            if (nexusComponentPath) {
                let NexusComponent = await nexusResolver(nexusComponentPath);

                let pageComponent = NexusComponent.default

                let renderer = () => h(pageComponent, { laravext: laravext.page_data }, {
                    props: () => ({
                        laravext: laravext.page_data
                    }),
                });

                conventions = conventions.filter(convention => convention !== 'page');

                for (let i = 0; i < conventions.length; i++) {
                    if (laravext.page_data?.nexus?.[conventions[i]]) {
                        try {
                            let conventionComponent = (await nexusResolver(laravext.page_data?.nexus?.[conventions[i]])).default;

                            const previousRenderer = renderer;
                            renderer = () => h(conventionComponent, { laravext }, {
                                default: () => previousRenderer(),
                                props: () => ({
                                    laravext
                                })
                            });
                        } catch (error) {
                            console.error(`Error loading convention ${conventions[i]} at ${laravext.page_data?.nexus?.[conventions[i]]}:`, error);
                        }
                    }
                }

                let nexusComponent = defineComponent({
                    render() {
                        return renderer()
                    }
                });

                let nexusApp = createSSRApp(nexusComponent);

                if(reverseSetupOrder && setupNexus){
                    nexusApp = setupNexus({ nexus: nexusApp, laravext });
                }

                if (setup) {
                    nexusApp = setup({ app: nexusApp, laravext });
                }

                if(!reverseSetupOrder && setupNexus){
                    nexusApp = setupNexus({ nexus: nexusApp, laravext });
                }

                nexusApp.mixin({
                    provide: mixins,
                    methods: mixins
                })

                let renderedComponent = render ? await render(nexusApp) : await renderToString(nexusApp);

                nexusElement.innerHTML = renderedComponent;
            }
        }
    }

    if (strandsResolver) {
        const strands = findStrands(document);
        for (let i = 0; i < strands.length; i++) {
            let strandElement = strands[i];

            const strandComponentPath = strandElement.getAttribute('strand-component');
            const strandData = JSON.parse(strandElement.getAttribute('strand-data'));

            if (strandComponentPath) {
                let StrandComponent = await strandsResolver(strandComponentPath);

                let strand = StrandComponent.default;

                let strandApp = createSSRApp(strand, { laravext, ...strandData });

                if(reverseSetupOrder && setupStrand){
                    strandApp = setupStrand({strand, laravext, strandData });
                }

                if (setup) {
                    strandApp = setup({ app: strandApp, laravext });
                }

                if(!reverseSetupOrder && setupStrand){
                    strandApp = setupStrand({strand, laravext, strandData });
                }

                strandApp.mixin({
                    provide: mixins,
                    methods: mixins
                })

                let renderedComponent = render ? await render(strandApp) : await renderToString(strandApp);

                strandElement.innerHTML = renderedComponent;

            }
        }
    }

}
