import './bootstrap';
import '../css/app.css';
import { createLaravextApp } from "@laravext/vue"

import VueCookies from 'vue-cookies'

import { createI18n } from 'vue-i18n'
import pt from './../../lang/pt.json'
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import { plugin as fkPluging, defaultConfig as fkDefaultConfig } from '@formkit/vue'
import VueSweetalert2 from 'vue-sweetalert2';
import fkConfig from './../../formkit.theme.js'
import 'sweetalert2/dist/sweetalert2.min.css';
import { resolveComponent } from '@laravext/vue/tools';
import { color } from '@formkit/icons';
import Cookies from 'js-cookie';


document.addEventListener('DOMContentLoaded', function () {
    createLaravextApp({
        nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
        strandsResolver: (name) => resolveComponent(`./strands/${name}.vue`, import.meta.glob('./strands/**/*.vue')),

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

            return app;
        },
        progress: {
            color: '#ff0000',
        }

    })
}, false);




