import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 6060
  },
  plugins: [react(), nodePolyfills()],
  base: `${process.env.GITHUB_REPOSITORY ?? ''}/`.match(/(\/.*)/)?.[1],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
