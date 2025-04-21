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
      algorithm: 'gzip', // or 'brotliCompress' for better compression
      ext: '.gz', // .br for Brotli
      threshold: 10240, // Compress assets > 10KB
      deleteOriginFile: false, // Keep original files
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
    strictPort: true,
    https: {
      key: './certs/localhost-key.pem',
      cert: './certs/localhost.pem',
    },
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: 'https://localhost:8080', // Ensure HTTPS origin for local dev
  },
});
