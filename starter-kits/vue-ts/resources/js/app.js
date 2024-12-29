import './bootstrap';
import '../css/app.css';
import { createLaravextApp } from "@laravext/vue3"
import { resolveComponent } from '@laravext/vue3/tools';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';

document.addEventListener('DOMContentLoaded', function () {
    createLaravextApp({
        nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
        strandsResolver: (name) => resolveComponent(`./strands/${name}.vue`, import.meta.glob('./strands/**/*.vue')),

        setup: ({app}) => {
            app.use(ZiggyVue)
            return app;
        }
    })
}, false);