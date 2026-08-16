import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { getDevToolsAliases } from '@mobile-devtools/vite-config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: getDevToolsAliases(__dirname, '../..'),
  },
  server: {
    port: 3001,
  },
});
