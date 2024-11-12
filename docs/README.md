# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

Most of the content sits inside the [docs](docs) folder and the [versioned_docs](versioned_docs) folder in the form of
markdown.

## Installation

```console
npm install
```

## Local Development

```console
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live
without having to restart the server.
Note this only builds for English locale unlike a production build.

> Documentation is written in `mdx`, a superset of markdown empowered with jsx.
> JetBrains and VSCode both provide MDX plugins.

## Production Build

```console
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.