import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  server: {
    allowedHosts: [
      'primp-snowbird-geometry.ngrok-free.dev'
    ],

    proxy: {
      '/arcgis': {
        target: 'https://sampleserver6.arcgisonline.com',

        changeOrigin: true,

        secure: true,
      },
    },
  },
});