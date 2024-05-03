import './bootstrap';
import '../css/app.css';
import { createLaravextApp, resolveComponent } from "@laravext/vue"

import VueCookies from 'vue-cookies'

import { createI18n } from 'vue-i18n'
import pt from './../../lang/pt.json'
import { ZiggyVue } from '../../vendor/tightenco/ziggy';

const i18n = createI18n({
    locale: 'pt',
    fallbackLocale: 'en',
    messages: {
        pt
    }
})

document.addEventListener('DOMContentLoaded', function () {
    createLaravextApp({
        nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
        strandsResolver: (name) => resolveComponent(`./strands/${name}.vue`, import.meta.glob('./strands/**/*.vue')),

        /**
         * You can use the `uses` key to add additional plugins to the Vue app.
         */
        uses: [
            /** @see https://www.npmjs.com/package/vue-cookies for original example */
            { plugin: VueCookies, options: { expires: '7d' } },

            { plugin: ZiggyVue },

            /** @see https://vue-i18n.intlify.dev/guide/essentials/started.html for original example */
            { plugin: i18n },
        ]
    })
}, false);




