import { defineConfig } from 'vitest/config';
import esbuild from 'esbuild';

// This project's pages/components use .js (not .jsx) files containing JSX.
// Vite 8's built-in transform for .js files doesn't parse JSX and errors
// out before any lower-priority plugin gets a chance to handle it. This
// `enforce: 'pre'` plugin runs first and converts JSX to plain JS directly
// via esbuild, so the built-in transform never sees any JSX syntax to
// reject.
const JSX_IN_JS_FILES = /(pages|components)\/.*\.js$/;

export default defineConfig({
  plugins: [
    {
      name: 'jsx-in-js-files',
      enforce: 'pre',
      async transform(code, id) {
        if (!JSX_IN_JS_FILES.test(id)) return null;
        const result = await esbuild.transform(code, {
          loader: 'jsx',
          jsx: 'automatic',
          sourcefile: id,
        });
        return { code: result.code, map: result.map };
      },
    },
  ],
  test: {
    environment: 'node',
  },
});
