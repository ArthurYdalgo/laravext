import { createLaravextApp, resolveComponent, sharedProps } from "@laravext/react"
import './bootstrap';
import '../css/app.css';
import pt from './../../lang/pt.json'

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const user = sharedProps()?.auth?.user;

i18n
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

i18n.changeLanguage(user?.locale || 'en')

document.addEventListener('DOMContentLoaded', function () {
    createLaravextApp({
        nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
        strandsResolver: (name) => resolveComponent(`./strands/${name}.jsx`, import.meta.glob('./strands/**/*.jsx')),
        progress: {
            color: '#ff0000CC',
        }

    })
}, false);



