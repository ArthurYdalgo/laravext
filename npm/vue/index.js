import { defineComponent } from 'vue';
import { setupProgress } from './progress';
import { render } from './tools';
import { visit } from './router';

export const laravext = () => {
    return window.__laravext;
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

window.addEventListener("popstate", function (event) {
    visit(window.location.href);
});

export function createLaravextApp({ nexusResolver, strandsResolver, uses = () => [], conventions = [
    'error',
    'layout',
    'middleware',
], progress = {}}) {
    window.__laravext.app = {
        nexusResolver,
        strandsResolver,
        uses,
        conventions,
    }

    setupProgress( progress );

    render();
}
