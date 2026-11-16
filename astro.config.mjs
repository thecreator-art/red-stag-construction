import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

const r = (p) => fileURLToPath(new URL(p, import.meta.url));

// Page bodies are React components rendered to static HTML at build time.
// These aliases stand in for the few next/* modules those components import.
export default defineConfig({
  site: 'https://redstagcc.com',
  trailingSlash: 'never',
  compressHTML: true,
  build: {
    format: 'file',
    inlineStylesheets: 'always',
  },
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: [
        { find: /^next\/link$/, replacement: r('./src/shims/next-link.tsx') },
        { find: /^next\/image$/, replacement: r('./src/shims/next-image.tsx') },
        { find: /^next\/navigation$/, replacement: r('./src/shims/next-navigation.ts') },
        { find: /^@\//, replacement: r('./src') + '/' },
      ],
    },
  },
});
