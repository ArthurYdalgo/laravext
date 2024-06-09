import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import laravel, { refreshPaths } from "laravel-vite-plugin";

export default function ({ mode }) {
    const env = loadEnv(mode, process.cwd());

    const host = env.VITE_APP_ENV == "local" ? env.VITE_APP_DOMAIN : undefined;

    return defineConfig({
        server: { host },
        plugins: [
            laravel({
                input: [
                    'resources/css/app.css',
                    'resources/js/app.js',
                ],
                refresh: [...refreshPaths, "resources/js/**", "app/**"],
            }),
            vue({
                template: {
                    transformAssetUrls: {
                        base: null,
                        includeAbsolute: false,
                    },
                },
            }),
        ],
        build: {
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            const modules = [
                                'vue-i18n',
                                'vue-sweetalert2',
                                'moment',
                                'lodash',
                                'vue-cookies',
                                'sweetalert2',
                                'ziggy-js',
                                '@formkit/vue',
                                '@formkit/pro',
                                '@formkit/icons',
                                'axios',
                                'floating-vue',
                                '@fortawesome/vue-fontawesome',
                                '@fortawesome/free-solid-svg-icons'
                            ];
                            const chunk = modules.find(module => id.includes(module));
                            return chunk ? `vendor-${chunk}` : 'vendor-others';
                        }
                    }
                }
            }
        }
    })
};