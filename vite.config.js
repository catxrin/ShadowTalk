import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/server': {
        target: 'http://localhost:3000/',
        rewrite: path => path.replace(/^\/server/, ''),
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
