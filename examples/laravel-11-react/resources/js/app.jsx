import { createLaravextApp, resolveComponent, sharedProps } from "@laravext/react"
import './bootstrap';
import '../css/app.css';
import pt from './../../lang/pt.json'

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

const user = sharedProps()?.auth?.user;
let initialLanguage = user?.locale || 'en';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            pt: {
                translation: pt
            }
        },
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });

i18n.changeLanguage(user?.locale || 'en')

document.addEventListener('DOMContentLoaded', function () {
    createLaravextApp({
        nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
        strandsResolver: (name) => resolveComponent(`./strands/${name}.jsx`, import.meta.glob('./strands/**/*.jsx'))
    })
}, false);




