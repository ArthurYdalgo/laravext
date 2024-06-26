import { resolveComponent } from "@laravext/react/tools"
import { createLaravextApp, sharedProps } from "@laravext/react"
import { Ziggy } from "./ziggy";
import './bootstrap';
import '../css/app.css';
import pt from './../../lang/pt.json'
import {route as ziggyRoute} from "../../vendor/tightenco/ziggy/src/js/index.js";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cookies from "js-cookie";

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

i18n.changeLanguage(user?.locale ?? Cookies.get('locale') ?? 'en')

window.Ziggy = sharedProps().ziggy;
window.route = (name, params, absolute) =>
    ziggyRoute(name, params, absolute, {
        ...Ziggy,
        url: sharedProps().ziggy.url
    });

document.addEventListener('DOMContentLoaded', function () {
    createLaravextApp({
        nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
        strandsResolver: (name) => resolveComponent(`./strands/${name}.jsx`, import.meta.glob('./strands/**/*.jsx')),
        progress: {
            color: '#ff0000CC',
        }
    })
}, false);