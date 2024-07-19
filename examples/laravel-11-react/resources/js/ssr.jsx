import { createLaravextSsrApp } from '@laravext/react';
import { resolveComponent } from "@laravext/react/tools"
import { serve } from "@laravext/react/server"
import { route } from '../../vendor/tightenco/ziggy/src/js';
import i18n from "i18next";
import { initReactI18next, I18nextProvider  } from "react-i18next";
import pt from '../../lang/pt.json'
import { renderToString } from 'react-dom/server';
import Cookies from 'js-cookie';

// Change this to what you see fit
const errorMessageShouldBeLogged = (message) => {
    if (typeof message !== 'string') return true;

    if (message.includes('useLayoutEffect does nothing on the server')) return false;
    if (message.includes("Could not find one or more icon(s)")) return false;
    if (message.includes("Could not find icon")) return false;

    return true;
}

const originalError = console.error;
console.error = (message, ...args) => {
    if (errorMessageShouldBeLogged(message)) {
        originalError(message, ...args);
    }
};

serve(({ window, cookies }) => createLaravextSsrApp({
    // This is optional, the default is renderToString from 'react-dom/server', but you can use renderToStaticMarkup if you want
    // render: renderToString,

    nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
    strandsResolver: (name) => resolveComponent(`./strands/${name}.jsx`, import.meta.glob('./strands/**/*.jsx')),
    // The beforeSetup function is executed once, before any of the setups. 
    // You can use this to set up global variables or anything else, such as localization, cookies, etc.
    beforeSetup: ({ laravext }) => {
        if(laravext?.page_data?.shared_props?.ziggy){
            global.route = (name, params, absolute) =>
                route(name, params, absolute, {
                    ...(laravext.page_data.shared_props.ziggy),
                    url: laravext.page_data.shared_props.ziggy.url,
                });
    
            global.Ziggy = laravext.page_data.shared_props.ziggy;
        }

        let user = laravext.page_data?.shared_props?.auth?.user;

        const i18nInstance = i18n.createInstance();
        i18nInstance
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

        i18nInstance.changeLanguage(user?.locale ?? cookies['locale'] ?? 'en');

        laravext.app.i18n = i18nInstance;
    },

    // This setup is applied to all components, including nexus and strands
    setup: ({ component, laravext }) => {
        return <I18nextProvider i18n={laravext.app.i18n}>
            {component}
        </I18nextProvider>
    },

    // The setupNexus function is applied only to the nexus component, after the 'setup' function, unless reverseSetupOrder is true
    // setupNexus: ({ nexus, laravext }) => {
    // return <AnyComponentOrProvider>{nexus}</AnyComponentOrProvider>;
    // },
    // The setupStrand function is applied only to the strand components, after the 'setup' function, unless reverseSetupOrder is true
    // The 'strandData' parameter is the data passed to the strand component from the blade where it was located, if applicable
    // setupStrand: ({strand, laravext, strandData}) => {
    //     return <AnyOtherComponentOrProvider>{strand}</AnyOtherComponentOrProvider>
    // },

    // If you want to reverse the order of the setup functions (for some reason), set this to true
    // reverseSetupOrder: true,

    // Don't forget to pass the window object to the laravext object
    laravext: window.__laravext,
    document: window.document,
}))



