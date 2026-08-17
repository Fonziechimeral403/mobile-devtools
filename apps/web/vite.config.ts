import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cloudflare } from '@cloudflare/vite-plugin';
import { getDevToolsAliases } from '@mobile-devtools/vite-config';

export default defineConfig({
  plugins: [react(), cloudflare()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      ...getDevToolsAliases(__dirname, '../..'),
    },
  },
  server: {
    port: 3000,
  },
});
