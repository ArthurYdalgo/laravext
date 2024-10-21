const { API_BUTTON } = require("./src/constants");

const editUrl = "https://github.com/yewstack/yew/blob/master/website/";

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: "Yew",
    tagline:
        "A framework for creating reliable and efficient web applications.",
    url: "https://yew.rs",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/logo.svg",
    organizationName: "yewstack", // Usually your GitHub org/user name.
    projectName: "yew", // Usually your repo name.
    themeConfig: {
        docs: {
            sidebar: {
                hideable: true,
            },
        },
        navbar: {
            title: "Yew",
            logo: {
                alt: "Yew Logo",
                src: "img/logo.svg",
            },
            items: [
                {
                    type: "docsVersionDropdown",
                    position: "left",
                },
                {
                    type: "doc",
                    position: "left",
                    docId: "getting-started/introduction",
                    label: "Docs",
                },
                {
                    docsPluginId: "community",
                    type: "doc",
                    position: "right",
                    docId: "awesome",
                    label: "Community",
                },
                {
                    position: "right",
                    to: "blog",
                    label: "Blog",
                },
                {
                    href: "https://github.com/yewstack/yew",
                    label: "GitHub",
                    position: "right",
                },
            ],
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "Support",
                    items: [
                        {
                            label: "Buy me a coffee",
                            href: "https://opencollective.com/yew",
                        },
                    ],
                },
                {
                    title: "Participate",
                    items: [
                        {
                            label: "GitHub",
                            href: "https://github.com/yewstack/yew",
                        },
                        {
                            label: "Discord",
                            href: "https://discord.gg/VQck8X4",
                        },
                        {
                            label: "Twitter",
                            href: "https://twitter.comddd/yewstack",
                        },
                    ],
                },
                {
                    title: "More",
                    items: [
                        {
                            label: "Yew Awesome",
                            href: "https://github.com/jetli/awesome-yew",
                        },
                    ],
                },
            ],
        },
        prism: {
            additionalLanguages: ["rust", "php", "toml"],
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
                            label: "Latest (1.x)",
                            path: 'latest'
                        },
                    },
                },
                blog: {
                    path: "blog",
                    blogTitle: "Yew Blog",
                    editUrl,
                },
                pages: {},
                gtag: {
                    trackingID: "G-DENCL8P4YP",
                    anonymizeIP: true,
                },
            },
        ],
    ],
    plugins: [
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
