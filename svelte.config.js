import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Untuk deploy ke GitHub Pages dengan subdirectory (misal: https://username.github.io/s2if/)
// Set environment variable: GITHUB_PAGES=true dan BASE_PATH=/s2if
// Atau hardcode base path di bawah ini

const dev = process.argv.includes('dev');
const basePath = process.env.BASE_PATH || '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html', // SPA mode for client-side routing
      precompress: false,
      strict: true
    }),
    prerender: {
      handleHttpError: 'warn'
    },
    paths: {
      base: dev ? '' : basePath
    }
  }
};

export default config;
