import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // Entry point of your SDK
  format: ["cjs", "esm"],   // Generate both CommonJS and ESM formats
  dts: true,                // Generate TypeScript declaration files
  sourcemap: true,          // Enable source maps for debugging
  clean: true,              // Clean the `dist/` folder before building
});