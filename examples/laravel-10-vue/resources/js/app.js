import './bootstrap';
import '../css/app.css';
import { createLaravextApp, resolveComponent } from "@laravext/vue"

import VueCookies from 'vue-cookies'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: {
            message: {
                hello: 'hello world'
            }
        },
        ja: {
            message: {
                hello: 'こんにちは、世界'
            }
        }
    }
})

document.addEventListener('DOMContentLoaded', function () {
    createLaravextApp({
        nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
        strandsResolver: (name) => resolveComponent(`./strands/${name}`, import.meta.glob('./strands/**/*')),

        /**
         * You can use the `uses` key to add additional plugins to the Vue app.
         */
        uses: [
            /** @see https://www.npmjs.com/package/vue-cookies for original example */
            { plugin: VueCookies, options: { expires: '7d' } },

            /** @see https://vue-i18n.intlify.dev/guide/essentials/started.html for original example */
            { plugin: i18n },
        ]
    })
}, false);




