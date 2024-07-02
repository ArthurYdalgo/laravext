import { createLaravextSsrApp } from '@laravext/react';
import { resolveComponent } from "@laravext/react/tools"
import { serve } from "@laravext/react/server"
import { route } from '../../vendor/tightenco/ziggy/src/js';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pt from '../../lang/pt.json'
import { renderToString } from 'react-dom/server';
import Cookies from 'js-cookie';

// Change this to what you see fit
const errorMessageShouldBeLogged = (message) => {
    if (typeof message !== 'string') return true;

    if (message.includes('useLayoutEffect does nothing on the server')) return false;
    if (message.includes("Could not find one or more icon(s)")) return false;

    return true;
}

const originalError = console.error;
console.error = (message, ...args) => {
    if (errorMessageShouldBeLogged(message)) {
        originalError(message, ...args);
    }
};

serve(({ window }) => createLaravextSsrApp({
    // This is optional, the default is renderToString, but you can use renderToStaticMarkup if you want
    // render: renderToString,

    nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
    strandsResolver: (name) => resolveComponent(`./strands/${name}.jsx`, import.meta.glob('./strands/**/*.jsx')),
    setupNexus: ({ nexus, laravext }) => {

        global.route = (name, params, absolute) =>
            route(name, params, absolute, {
                ...(laravext.page_data.shared_props.ziggy),
                url: laravext.page_data.shared_props.ziggy.url,
            });

        global.Ziggy = laravext.page_data.shared_props.ziggy;

        let user = laravext.page_data?.shared_props?.auth?.user;

        i18n
            .use(initReactI18next)
            .init({
                resources: {
                    pt: {
                        translation: pt
                    }
                },
                fallbackLng: "en",
                interpolation: {
                    escapeValue: false
                }
            });

        i18n.changeLanguage(user?.locale ?? Cookies.get('locale') ?? 'en')

        // In case you need to wrap your app with a provider or something similar
        // return <AnyComponentOrProvider>{nexus}</AnyComponentOrProvider>;

        return nexus;
    },
    // setupStrand({strand, laravext}){
    //     return <AnyComponentOrProvider>{strand}</AnyComponentOrProvider>
    // }
    laravext: window.__laravext,
    document: window.document,
}))



