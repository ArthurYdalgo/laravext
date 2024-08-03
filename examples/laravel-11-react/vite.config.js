import { defineConfig, loadEnv } from 'vite';
import react from "@vitejs/plugin-react";
import laravel, { refreshPaths } from "laravel-vite-plugin";
import path from 'path';

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
                    'resources/js/app.jsx',
                ],
                refresh: true,
                ssr: 'resources/js/ssr.jsx',
            }),
            react()
        ],
        build: {
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            const modules = [
                                'moment',
                                'lodash',
                                'sweetalert2',
                                'axios',
                                '@fortawesome/free-solid-svg-icons',
                                'nprogress',
                                'react-i18next',
                                'zustand',
                                '@fortawesome/free-solid-svg-icons',
                                'react-markdown',
                                'remark-gfm',
                                '@mdxeditor/editor',
                                '@mdx-js/mdx',
                                'react-syntax-highlighter',
                                'hast-util',
                                'mdast-util',
                                // '@lezer',
                                // '@codemirror'
                            ];
                            // return `vendor-${id}`;
                            const chunk = modules.find(module => id.includes(module));
                            return chunk ? `vendor-${chunk}` : 'vendor-others';
                        }
                    }
                }
            }
        }
    })
};
