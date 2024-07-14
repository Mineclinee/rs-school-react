import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  // test: {
  //   globals: true,
  //   enviroment: 'jsdom',
  //   setupFiles: './__tests__/setup.ts',
  // },
  css: {
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
});
