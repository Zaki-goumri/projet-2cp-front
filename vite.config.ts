import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import  path  from 'path';  


export default defineConfig({
 base: "/",
 plugins: [
  react(),
  tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
 preview: {
  port: 8080,
  strictPort: true,
 },
 server: {
  port: 8080,
  strictPort: false,
  host: true,
  origin: "http://0.0.0.0:8080",
 },
});