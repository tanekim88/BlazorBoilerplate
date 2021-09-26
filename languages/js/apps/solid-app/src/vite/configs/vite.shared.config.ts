import { defineConfig } from "vite";


export const commonConfig = defineConfig(async ({ command, mode }) => {
  return {
    build: {
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      sourcemap: false
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `$injectedColor: orange;`
        }
      },
      postcss: {

      }
    },
    optimizeDeps: {
      include: [],
      exclude: [],
      esbuildOptions: {
        keepNames: false,
      }
    },
    plugins: [
      // VitePluginGlobInput({

      // })
    ],
    resolve: {
      // alias:[{
      //   find:'@projects/shared',
      //   replacement:'./solidApp'
      // }]
    }
  }
});
