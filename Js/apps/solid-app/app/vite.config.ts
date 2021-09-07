import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);
const outDir = path.join(__dirname, '..', 'wwwroot');

export default defineConfig({
  plugins: [solidPlugin(), vanillaExtractPlugin()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
    outDir,
  },
});
