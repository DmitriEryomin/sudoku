import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@services': path.resolve(__dirname, './src/services'),
      '@game': path.resolve(__dirname, './src/features/Game'),
    },
  },
  plugins: [react()],
  base: '',
});
