import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  publicDir: 'public',
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ open: true }) as PluginOption,
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240,
      deleteOriginFile: false,
    }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  preview: {
    port: 8080,
    strictPort: false,
  },
  server: {
    port: 8080,
    strictPort: false,
    host: true,
    origin: 'http://localhost:8080',
  },
});
