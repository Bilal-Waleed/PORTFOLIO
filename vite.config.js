import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: [
      'a509-103-84-151-80.ngrok-free.app',
      'localhost',
    ],
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
          particles: ['react-tsparticles', 'tsparticles-slim'],
          forms: ['react-hook-form', '@hookform/resolvers', 'yup', '@emailjs/browser'],
        },
      },
    },
  },
})
