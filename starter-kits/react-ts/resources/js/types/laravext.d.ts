declare module "@laravext/react" {
    export const createLaravextApp: any;
    export const createLaravextSsrApp: any;
    export const Head: any;
    export const Link: any;
    export const laravext: any;
    export const laravextPageData: any;
    export const version: any;
    export const nexus: any;
    export const nexusProps: any;
    export const sharedProps: any;
    export const routeParams: any;
    export const routeName: any;
    export const queryParams: any;
    export const path: any;
    export const url: any;
    export const urlIntended: any;
    export const visit: any;
}

declare module "@laravext/react/server" {
    export const serve: any;
}

declare module "@laravext/react/tools" {
    export const resolveComponent: any;
}

declare module "@laravext/react/progress" {
  export const injectCSS: any;
  export const setupProgress: any;
  export const startProgress: any;
  export const moveProgress: any;
  export const endProgress: any;
}