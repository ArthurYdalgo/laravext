import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from '@rollup/plugin-json'; // Handle JSON imports
import { terser } from 'rollup-plugin-terser'; // Optional: for minification

export default [
  // Bundle for each file in the directory
  {
    input: {
      index: 'index.jsx',
      server: 'server.jsx',
      tools: 'tools.jsx',
      router: 'router.jsx',
      progress: 'progress.jsx'
    },
    output: [
      {
        dir: 'dist/cjs', // Output directory for CommonJS modules
        format: 'cjs',
        exports: 'auto',
        entryFileNames: '[name].cjs.js', // Naming convention for the output files
      },
      {
        dir: 'dist/esm', // Output directory for ES Modules
        format: 'esm',
        entryFileNames: '[name].esm.js', // Naming convention for the output files
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      json(),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react', '@babel/preset-env']
      }),
      terser() // Optional: minifies the output
    ],
    external: ['react', 'react-dom'] // Don't bundle peer dependencies
  }
];
