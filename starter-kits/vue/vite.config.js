import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import laravel from "laravel-vite-plugin";

export default function ({ mode }) {
    const env = loadEnv(mode, process.cwd());

    const host = env.VITE_APP_ENV == "local" ? env.VITE_APP_DOMAIN : undefined;

    return defineConfig({
        server: {
            host: host
        },
        plugins: [
            laravel({
                input: [
                    'resources/css/app.css',
                    'resources/js/app.js',
                ],
                refresh: true,
            }),

            vue({
                template: {
                    transformAssetUrls: {
                        base: null,
                        includeAbsolute: false,
                    },
                },
            }),
        ]
    })
};
