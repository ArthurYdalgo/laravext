import './bootstrap';
import '../css/app.css';
import { createLaravextApp } from "@laravext/vue3"

import { createI18n } from 'vue-i18n'
import pt from './../../lang/pt.json'
import { plugin as fkPluging, defaultConfig as fkDefaultConfig } from '@formkit/vue'
import VueSweetalert2 from 'vue-sweetalert2';
import fkConfig from './../../formkit.theme.js'
import 'sweetalert2/dist/sweetalert2.min.css';
import { resolveComponent } from '@laravext/vue3/tools';
import Cookies from 'js-cookie';


document.addEventListener('DOMContentLoaded', function () {
    createLaravextApp({
        nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
        strandsResolver: (name) => resolveComponent(`./strands/${name}.vue`, import.meta.glob('./strands/**/*.vue')),
        // The beforeSetup function is executed once, before any of the setups. 
        // You can use this to set something up, such as internationalization.
        beforeSetup: ({ laravext }) => {
            let user = laravext.page_data?.shared_props?.auth?.user;
    
            let locale = user?.locale ?? Cookies.get('locale') ?? 'en';
    
            const i18n = createI18n({
                legacy: false,
                locale: locale,
                fallbackLocale: 'en',
                messages: {
                    pt
                }
            })
    
            laravext.app.i18n = i18n;
        },
        // This setup is applied to all components, including nexus and strands
        setup: ({ app, laravext }) => {
            app.use(laravext.app.i18n);
            app.use(VueSweetalert2);
            app.use(fkPluging, fkDefaultConfig(fkConfig));

            return app;
        },
        progress: {
            color: '#ff0000',
        }

        // The setupNexus function is applied only to the nexus component, after the 'setup' function, unless reverseSetupOrder is true
        // setupNexus: ({ nexus, laravext }) => {
        //     // Anything you want to do with the nexus app instance
        //     nexus.use(Something)

        //     return nexus;
        // },
        // The setupStrand function is applied only to the strand components, after the 'setup' function, unless reverseSetupOrder is true
        // The 'strandData' parameter is the data passed to the strand component from the blade where it was located, if applicable
        // setupStrand: ({strand, laravext, strandData}) => {
        //     // Anything you want to do with the strand app instance
        //     strand.use(SomethingElse)
        //     return strand
        // },

        // If you want to reverse the order of the setup functions (for some reason), set this to true
        // reverseSetupOrder: true,

        // If for some reason you must disable the pushState of the laravext client router, you can do so here. Be aware that this will disable the 
        // back navigation, and you're user will endup going back to the previous non-laravext page.
        // disablePushedStateData: () => {
        //    // Your logic here, such as detecting browsers, etc.
        //    let logicResult = true
        //    return logicResult
        // },
    })
}, false);




