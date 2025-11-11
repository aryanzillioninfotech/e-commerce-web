import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// This configuration explicitly forces Vite to use the pure JavaScript
// implementation of the 'sass' dependency to resolve the Vercel build error
// "sass --embedded is unavailable in pure JS mode."

export default defineConfig({
  plugins: [react()],
  css: {
    // Configuration for preprocessors like SCSS
    preprocessorOptions: {
      scss: {
        // We use 'as any' here to bypass the TypeScript error (2769).
        // The 'implementation' property is required to fix the deployment,
        // but it is not included in Vite's default type definitions.
        implementation: require('sass'),
      } as any,
    },
  },
});