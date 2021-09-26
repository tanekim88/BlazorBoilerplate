import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import customPlugin from "./vite/plugins/vite-plugin-custom";
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
const filename = fileURLToPath(import.meta.url);
const _dirname = dirname(filename);

const outDir = path.resolve(_dirname, '..', 'out');
const buildDirPath = path.resolve(outDir, 'solid');

export default defineConfig({
  plugins: [solidPlugin(), vanillaExtractPlugin(), customPlugin({
    buildDirPath
  })],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
    outDir: '../out/solid',
    minify: false,
    rollupOptions: {

    },
  },
  optimizeDeps: {
    esbuildOptions: {
      keepNames: false
    }
  }
});
