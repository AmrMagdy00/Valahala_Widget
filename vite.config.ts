/**
 * Vite build configuration
 * Builds widget as IIFE library with CSS injected automatically
 */
import { defineConfig, loadEnv } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    // Injects CSS into JS bundle so no separate CSS file is needed
    plugins: [cssInjectedByJsPlugin()],
    build: {
      lib: {
        entry: "src/index.ts",
        name: "ValahaWidget",
        fileName: "valaha-widget",
        formats: ["iife"], // Immediately Invoked Function Expression format
      },
    },
    // Define env variables to be available in the code at build time
    // Reads VITE_BASE_URL from .env file and makes it available as BASE_URL
    define: {
      "import.meta.env.BASE_URL": JSON.stringify(
        env.VITE_BASE_URL || "http://localhost:5000"
      ),
    },
  };
});
