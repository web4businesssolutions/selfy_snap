import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()

  ],
  build: {
    outDir: 'dist'
  },
  base: './',
  server: {
    allowedHosts: ['www.selfysnap.com']
  }

})
