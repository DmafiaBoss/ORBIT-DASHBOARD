import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (/node_modules\/(react|react-dom|scheduler|react-router)\//.test(id)) return 'vendor-react';
          if (/node_modules\/(leaflet|react-leaflet|@react-leaflet)\//.test(id)) return 'vendor-maps';
          if (/node_modules\/lucide-react\//.test(id)) return 'vendor-icons';
          return 'vendor-common';
        },
      },
    },
  },
})
