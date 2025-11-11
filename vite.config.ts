import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import * as sass from 'sass'

// This configuration explicitly forces Vite to use the pure JavaScript
// implementation of the 'sass' dependency to resolve the Vercel build error
// "sass --embedded is unavailable in pure JS mode."

export default defineConfig({
  plugins: [react()],
  css: {
    // Configuration for preprocessors like SCSS
    preprocessorOptions: {
      scss: {
        // FIX: We must use a dynamic import and wrap it in a Promise to correctly
        // load the 'sass' module in an ES Module project that uses the 'require' 
        // fallback inside the implementation property.
        implementation:
        (async () => {
          // Check if 'sass' is installed before importing (optional safety)
          try {
            return (await import('sass')).default;
          } catch (e) {
            console.error("Failed to load 'sass' implementation:", e);
            throw e; // Re-throw to fail build if necessary dependency is missing
          }
        })(),
      } as any,
    },
  },
});