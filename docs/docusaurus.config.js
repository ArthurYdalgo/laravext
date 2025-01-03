const editUrl = "https://github.com/ArthurYdalgo/laravext/blob/master/docs/";
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: "Laravext",
    tagline:
        "An Inertia-styled monolith with Next.js' file-based routing system and file conventions for Vue and React",
    url: "https://laravext.dev",
    baseUrl: "/",
    trailingSlash: false,
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "throw",
    favicon: "images/favicon.ico",
    organizationName: "ArthurYdalgo", // Usually your GitHub org/user name.
    projectName: "laravext", // Usually your repo name.
    themeConfig: {
        docs: {
            sidebar: {
                hideable: true,
            },
        },
        metadata: [{ name: 'og:image', content: 'https://laravext.dev/images/og_image.png' }],
        colorMode: {
            defaultMode: 'dark',
            disableSwitch: false,
            respectPrefersColorScheme: false,
        },
        navbar: {
            title: "Laravext",
            logo: {
                alt: "Laravext Logo",
                src: "images/logo.png",
            },
            items: [
                {
                    type: "doc",
                    position: "left",
                    docId: "laravext",
                    label: "Docs",
                },
                {
                    docsPluginId: "community",
                    type: "doc",
                    position: "right",
                    docId: "contributors",
                    label: "Community",
                },
                {
                    position: "right",
                    to: "blog",
                    label: "Blog",
                },
                {
                    href: "https://github.com/ArthurYdalgo/laravext",
                    label: "GitHub",
                    position: "right",
                },
            ],
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "Links",
                    items: [
                        {
                            label: "Packagist",
                            href: "https://packagist.org/packages/arthurydalgo/laravext",
                        },
                        {
                            label: "NPM @laravext/react",
                            href: "https://www.npmjs.com/package/@laravext/react",
                        },
                        {
                            label: "NPM @laravext/vue3",
                            href: "https://www.npmjs.com/package/@laravext/vue3",
                        },
                    ],
                },
                {
                    title: "Participate",
                    items: [
                        {
                            label: "GitHub (Docs and NPM packages)",
                            href: "https://github.com/ArthurYdalgo/laravext",
                        },
                        {
                            label: "GitHub (Packagist)",
                            href: "https://github.com/ArthurYdalgo/laravext-packagist",
                        },
                        {
                            label: "Discord",
                            href: "https://dsc.gg/laravext",
                        },
                        {
                            label: "Twitter/X",
                            href: "https://twitter.com/laravext_dev",
                        },
                        {
                            "label": "YouTube",
                            "href": "https://youtube.com/@laravext"
                          }
                    ],
                },
                {
                    title: "More",
                    items: [
                        {
                            label: "Buy me a coffee",
                            href: "https://buymeacoffee.com/arthurydalgo",
                        },
                    ],
                },
            ],
        },
        prism: {
            theme: prismThemes.dracula,
            additionalLanguages: ["php", "toml", 'jsx', 'json'],
        }
    },
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },
    presets: [
        [
            "@docusaurus/preset-classic",
            {
                theme: {
                    customCss: ["./src/css/custom.css"],
                },
                docs: {
                    path: "docs",
                    sidebarPath: require.resolve("./sidebars/docs.js"),
                    editUrl,
                    routeBasePath: "/docs",
                    versions: {
                        current: {
                            label: "Latest (1.0)",
                            path: 'latest'
                        },
                    },
                },
                blog: {
                    path: "blog",
                    blogTitle: "Laravext Blog",
                    editUrl,
                },
                pages: {},
            },
        ],
    ],
    plugins: [
        require.resolve('docusaurus-lunr-search'),
        "docusaurus-plugin-sass",
        [
            "@docusaurus/plugin-content-docs",
            {
                id: "community",
                path: "community",
                sidebarPath: require.resolve("./sidebars/community.js"),
                routeBasePath: "/community",
                editUrl,
            },
        ],
    ],
};
