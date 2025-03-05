import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    build: {
      // Production optimizations
      minify: isProduction ? 'terser' : false,
      terserOptions: isProduction ? {
        compress: {
          drop_console: true,  // Remove console.* calls
          drop_debugger: true, // Remove debugger statements
        },
        format: {
          comments: false,     // Remove comments
        },
      } : undefined,
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor code into separate chunks
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['framer-motion', 'lucide-react'],
            'supabase-vendor': ['@supabase/supabase-js'],
          },
        },
      },
      // Generate source maps for easier debugging
      sourcemap: !isProduction,
    },
  };
});
