import './bootstrap';
import '../css/app.css';
import i18n from "i18next";
import Cookies from "js-cookie";
import pt from './../../lang/pt.json'
import mdxeditor from './../../lang/pt/mdxeditor.json'
import { initReactI18next } from "react-i18next";
import { createLaravextApp } from "@laravext/react"
import { resolveComponent } from "@laravext/react/tools"

document.addEventListener('DOMContentLoaded', function () {
    createLaravextApp({
        nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
        strandsResolver: (name) => resolveComponent(`./strands/${name}.jsx`, import.meta.glob('./strands/**/*.jsx')),
        progress: {
            color: '#ff0000CC',
        },
        // The beforeSetup function is executed once, before any of the setups. 
        // You can use this to set something up, such as localization.
        beforeSetup: ({ laravext }) => {
            const user = laravext.page_data.shared_props?.auth?.user;
            
            i18n
            .use(initReactI18next)
            .init({
                resources: {
                    pt: {
                        translation: { ...pt, ...mdxeditor }
                    }
                },
                fallbackLng: "en",
                interpolation: {
                    escapeValue: false
                }
            });
            
            i18n.changeLanguage(user?.locale ?? Cookies.get('locale') ?? 'en')
        },

        // This setup is applied to all components, including nexus and strands
        // setup: ({ component, laravext }) => {
        //     return <AnyComponentOrProvider>
        //         {component}
        //     </AnyComponentOrProvider>
        // },

        // The setupNexus function is applied only to the nexus component, after the 'setup' function, unless reverseSetupOrder is true
        // setupNexus: ({ nexus, laravext }) => {
        // return <AnyComponentOrProvider>{nexus}</AnyComponentOrProvider>;
        // },
        // The setupStrand function is applied only to the strand components, after the 'setup' function, unless reverseSetupOrder is true
        // The 'strandData' parameter is the data passed to the strand component from the blade where it was located, if applicable
        // setupStrand: ({strand, laravext, strandData}) => {
        //     return <AnyComponentOrProvider>{strand}</AnyComponentOrProvider>
        // },

        // If you want to reverse the order of the setup functions, set this to true
        // reverseSetupOrder: true,

        // If for some reason you must disable the pushState of the laravext client router, you can do so here. Be aware that this will disable the 
        // back navigation, and you're user will endup going back to the previous non-laravext page.
        // disablePushState: () => {
        //    // Your logic here, such as detecting browsers, etc.
        //    let logicResult = true
        //    return logicResult
        // },
    })
}, false);