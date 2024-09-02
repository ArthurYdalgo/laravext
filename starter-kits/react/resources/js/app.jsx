import './bootstrap';
import '../css/app.css';
import { createLaravextApp } from "@laravext/react"
import { resolveComponent } from '@laravext/react/tools';


document.addEventListener('DOMContentLoaded', function () {
    createLaravextApp({
        nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
        strandsResolver: (name) => resolveComponent(`./strands/${name}.jsx`, import.meta.glob('./strands/**/*.jsx')),
    })
}, false);