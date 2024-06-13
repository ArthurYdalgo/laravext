import './bootstrap';
import '../css/app.css';
import { createLaravextApp, sharedProps } from "@laravext/vue"

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


document.addEventListener('DOMContentLoaded', function () {
    createLaravextApp({
        nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
        strandsResolver: (name) => resolveComponent(`./strands/${name}.vue`, import.meta.glob('./strands/**/*.vue')),
        uses: () => {
            const i18n = createI18n({
                legacy: false,
                locale: sharedProps()?.auth?.user?.locale || 'en',
                fallbackLocale: 'en',
                messages: {
                    pt
                }
            })

            return [
                { plugin: VueCookies, options: { expires: '7d' } },
    
                { plugin: ZiggyVue },
    
                /** @see https://vue-i18n.intlify.dev/guide/essentials/started.html for original example */
                { plugin: i18n },
                { plugin: VueSweetalert2 },
                { plugin: fkPluging, options: fkDefaultConfig (fkConfig) },
            ]
            
        },
        progress: {
            color: '#ff0000',
        }

    })
}, false);




