#!/usr/bin/env node
import esbuild from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'

const watch = process.argv.slice(1).includes('--watch')

const config = {
  bundle: true,
  minify: true,
  sourcemap: true,
  target: 'es2020',
  plugins: [nodeExternalsPlugin()],
}

const builds = [
  { entryPoints: ['index.jsx'], format: 'esm', outfile: 'dist/index.esm.js', platform: 'browser' },
  { entryPoints: ['index.jsx'], format: 'cjs', outfile: 'dist/index.js', platform: 'browser' },
  { entryPoints: ['server.jsx'], format: 'esm', outfile: 'dist/server.esm.js', platform: 'node' },
  { entryPoints: ['server.jsx'], format: 'cjs', outfile: 'dist/server.js', platform: 'node' },
  { entryPoints: ['tools.jsx'], format: 'esm', outfile: 'dist/tools.esm.js', platform: 'browser' },
  { entryPoints: ['tools.jsx'], format: 'cjs', outfile: 'dist/tools.js', platform: 'browser' },
  { entryPoints: ['router.jsx'], format: 'esm', outfile: 'dist/router.esm.js', platform: 'browser' },
  { entryPoints: ['router.jsx'], format: 'cjs', outfile: 'dist/router.js', platform: 'browser' },
  { entryPoints: ['progress.jsx'], format: 'esm', outfile: 'dist/progress.esm.js', platform: 'browser' },
  { entryPoints: ['progress.jsx'], format: 'cjs', outfile: 'dist/progress.js', platform: 'browser' },
]

builds.forEach((build) => {
  esbuild
    .build({ ...config, ...build, ...watcher(build) })
    .then(() => console.log(`${watch ? 'Watching' : 'Built'} ${build.entryPoints} (${build.format})…`))
    .catch(() => process.exit(1))
})

function watcher(build) {
  return watch
    ? {
        watch: {
          onRebuild: (error) =>
            error
              ? console.error('Watch failed:', error)
              : console.log(`Rebuilding ${build.entryPoints} (${build.format})…`),
        },
      }
    : {}
}