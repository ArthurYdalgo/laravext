declare module "@laravext/vue3" {
    export const createLaravextApp: any;
    export const createLaravextSsrApp: any;
    export const Head: any;
    export const Link: any;
    export const laravextPageData: any;
    export const version: any;
    export const nexus: any;
    export const nexusProps: any;
    export const sharedProps: any;
    export const routeParams: any;
    export const routeName: any;
    export const url: any;
    export const path: any;
    export const urlIntended: any;
    export const queryParams: any;
    export const visit: any;
}

declare module "@laravext/vue3/server" {
    export const serve: any;
}

declare module "@laravext/vue3/tools" {
    export const resolveComponent: any;
    export const shouldLinkClickEventBeIntercepted: any;
}

declare module "@laravext/vue3/progress" {
  export const injectCSS: any;
  export const setupProgress: any;
  export const startProgress: any;
  export const moveProgress: any;
  export const endProgress: any;
}