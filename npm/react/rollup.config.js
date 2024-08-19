import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from '@rollup/plugin-json'; // Import the JSON plugin

export default {
  input: 'index.jsx', // Your entry point
  output: [
    {
      file: 'dist/index.cjs.js', // Output for CommonJS
      format: 'cjs', // CommonJS format
      exports: 'auto', // Let Rollup handle exports automatically
    },
    {
      file: 'dist/index.esm.js', // Output for ESModule
      format: 'esm', // ESModule format
    }
  ],
  plugins: [
    resolve(), // Resolve modules from node_modules
    commonjs(), // Convert CommonJS modules to ESModules
    json(), // Enable JSON file imports
    babel({
      exclude: 'node_modules/**', // Exclude node_modules from Babel
      presets: ['@babel/preset-react', '@babel/preset-env'] // Transform JSX and modern JS
    })
  ],
  external: ['react', 'react-dom'] // Exclude peer dependencies from the bundle
};
