import './bootstrap';
import '../css/app.css';

import VueCookies from 'vue-cookies'

import { createLaravextApp, resolveComponent } from "@laravext/vue"

document.addEventListener('DOMContentLoaded', function() {
    createLaravextApp({
        nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
        strandsResolver: (name) => resolveComponent(`./strands/${name}.vue`, import.meta.glob('./strands/**/*.vue')),
        uses: [
            {plugin: VueCookies, options: {expires: '7d'}}
        ]
    })
 }, false);




