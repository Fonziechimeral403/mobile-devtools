import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { getDevToolsAliases } from '@mobile-devtools/vite-config';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: getDevToolsAliases(__dirname, '../..'),
  },
  server: {
    port: 3002,
  },
});
