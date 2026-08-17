import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { getDevToolsAliases } from '@mobile-devtools/vite-config';

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: getDevToolsAliases(__dirname, '../..'),
    conditions: ['browser'],
  },
  server: {
    port: 3003,
  },
});
