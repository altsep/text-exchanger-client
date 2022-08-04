import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    outDir: '../../dist',
  },
  server: {
    port: 3000,
    proxy: {
      '^/api(/\\w+)?': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
    },
  },
  plugins: [react(), tsconfigPaths()],
});
