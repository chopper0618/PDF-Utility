import { defineConfig } from 'vite';

export default defineConfig({
  base: '/PDF-Utility/',
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
