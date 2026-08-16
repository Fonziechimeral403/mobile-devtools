import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { getDevToolsAliases } from '@mobile-devtools/vite-config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      ...getDevToolsAliases(__dirname, '../..'),
    },
  },
  server: {
    port: 3000,
    allowedHosts: ['192.168.18.3', 'localhost'],
  },
});
