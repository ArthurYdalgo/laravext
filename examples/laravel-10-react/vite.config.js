import { defineConfig, loadEnv } from 'vite';
import react from "@vitejs/plugin-react";
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
                    'resources/js/app.jsx',
                ],
                refresh: [...refreshPaths, "resources/js/**", "app/**"],
            }),
            react()
        ],
    })
};