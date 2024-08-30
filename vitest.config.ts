import react from "@vitejs/plugin-react";
import path from "path";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],

  test: {
    alias: {
      "@": path.resolve(__dirname, "./")
    },

    coverage: {
      include: ["tests/**/*.{ts,tsx,js,jsx}"],
      exclude: [...configDefaults.exclude]
    },
    globals: true
  }
});
