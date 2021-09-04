import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  plugins: [solidPlugin(), vanillaExtractPlugin()],
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
