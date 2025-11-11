import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// This configuration explicitly forces Vite to use the pure JavaScript
// implementation of the 'sass' dependency to resolve the build error
// "sass --embedded is unavailable in pure JS mode."

export default defineConfig({
  plugins: [react()],
  css: {
    // Configuration for preprocessors like SCSS
    preprocessorOptions: {
      scss: {
        // This line tells Vite to explicitly use the 'sass' module
        // you installed, rather than trying to find a faster,
        // embedded/native implementation that is failing.
        implementation: require('sass'),
      },
    },
  },
});