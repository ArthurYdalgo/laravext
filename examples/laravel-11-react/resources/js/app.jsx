import { resolveComponent } from "@laravext/react/tools"
import { createLaravextApp, sharedProps } from "@laravext/react"

import './bootstrap';
import '../css/app.css';
import pt from './../../lang/pt.json'
import { route } from '../../vendor/tightenco/ziggy';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cookies from "js-cookie";

document.addEventListener('DOMContentLoaded', function () {
    createLaravextApp({
        nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),
        strandsResolver: (name) => resolveComponent(`./strands/${name}.jsx`, import.meta.glob('./strands/**/*.jsx')),
        progress: {
            color: '#ff0000CC',
        },
        setup: ({ laravext }) => {
            const user = laravext.page_data.shared_props?.auth?.user;

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

            window.route = (name, params, absolute) =>
                route(name, params, absolute, {
                    ...(laravext.page_data.shared_props.ziggy),
                    url: laravext.page_data.shared_props.ziggy.url
                });

        }
        // The setupNexus function is applied only to the nexus component
        // setupNexus: ({ nexus, laravext }) => {
        // In case you need to wrap your app with a provider or something similar
        // return <AnyComponentOrProvider>{nexus}</AnyComponentOrProvider>;
        // },
        // The setupStrand function is applied only to the strand components
        // setupStrand: ({strand, laravext}) => {
        //     return <AnyComponentOrProvider>{strand}</AnyComponentOrProvider>
        // }
    })
}, false);