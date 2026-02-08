import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // IMPORTANT: This 'base' must match your GitHub repository name exactly.
  // This is what prevents the 'blank white screen' error.
  base: '/theKore-Browser/', 

  plugins: [react()],
  
  build: {
    // This helps optimize the gaming-focused performance of TheKore
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },

  server: {
    port: 3000,
    open: true, // Automatically opens the browser for you locally
  }
});
