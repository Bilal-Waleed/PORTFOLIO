import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: [
      'a509-103-84-151-80.ngrok-free.app', // Added ngrok host
      'localhost', // Optional: Included for local development
    ],
  },
})