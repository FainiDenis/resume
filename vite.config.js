import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Replace 'it-resume' with your actual GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: "/resume/",
});
