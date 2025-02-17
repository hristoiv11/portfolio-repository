import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,  // Keep your existing port
    host: true,   // Allow external access
    strictPort: true,
    allowedHosts: [
      "localhost",
      "portfolio-app-frontend-dtrod.ondigitalocean.app" // ✅ Add your DigitalOcean frontend domain
    ]
  }
})

/*
export default defineConfig({
  plugins: [
      react(),
    checker({
      typescript: true, // Enable TypeScript type checking
    }),
  ],
  server: {
    port: 5173, // Change if port 3000 is already in use
    open: true, // Automatically open your app in the browser
    hmr: {
      overlay: true, // Display errors directly in the browser
    },
  },
})
 */