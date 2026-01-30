import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,        // default Vite port
    open: true         // auto-open browser
  },

  build: {
    outDir: 'dist',    // build output directory
    sourcemap: false
  },

  define: {
    'process.env': {}  // prevents env issues in some libraries
  }
});
