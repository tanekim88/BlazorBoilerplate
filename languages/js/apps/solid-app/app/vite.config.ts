import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const filename = fileURLToPath(import.meta.url);
const dirName = dirname(filename);
const outDir = path.join(dirName, '..', 'wwwroot');

export default defineConfig({
  plugins: [solidPlugin(), vanillaExtractPlugin()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
    outDir,
  },
  server: {
    port: 80,
    host: true
  }
});
