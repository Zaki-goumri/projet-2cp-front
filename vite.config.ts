import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
 base: "/",
 plugins: [react(),tailwindcss()],
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