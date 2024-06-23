import { setupProgress } from './progress';
import { clientRender, serverRender } from './tools';
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

export function Head({ title }) {
    if(title){
        document.title = title;
    }

    return null;
}

export function createLaravextApp({ nexusResolver, strandsResolver, conventions = [
    'error',
    'layout',
    'middleware',
], progress = {} }) {

    window.__laravext.app = {
        nexusResolver,
        strandsResolver,
        conventions,
    }

    if(progress){
        setupProgress( progress );
    }
    
    clientRender();
}

export async function createLaravextSsrApp({ nexusResolver, strandsResolver, conventions = [
    'error',
    'layout',
    'middleware',
] }) {

    window.__laravext.app = {
        nexusResolver,
        strandsResolver,
        conventions,
    }
    
    return await serverRender();
}