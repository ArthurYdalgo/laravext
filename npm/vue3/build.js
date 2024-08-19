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
  { entryPoints: ['index.js'], format: 'esm', outfile: 'dist/index.esm.js', platform: 'browser' },
  { entryPoints: ['index.js'], format: 'cjs', outfile: 'dist/index.js', platform: 'browser' },
  { entryPoints: ['server.js'], format: 'esm', outfile: 'dist/server.esm.js', platform: 'node' },
  { entryPoints: ['server.js'], format: 'cjs', outfile: 'dist/server.js', platform: 'node' },
  { entryPoints: ['tools.js'], format: 'esm', outfile: 'dist/tools.esm.js', platform: 'browser' },
  { entryPoints: ['tools.js'], format: 'cjs', outfile: 'dist/tools.js', platform: 'browser' },
  { entryPoints: ['router.js'], format: 'esm', outfile: 'dist/router.esm.js', platform: 'browser' },
  { entryPoints: ['router.js'], format: 'cjs', outfile: 'dist/router.js', platform: 'browser' },
  { entryPoints: ['progress.js'], format: 'esm', outfile: 'dist/progress.esm.js', platform: 'browser' },
  { entryPoints: ['progress.js'], format: 'cjs', outfile: 'dist/progress.js', platform: 'browser' },
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