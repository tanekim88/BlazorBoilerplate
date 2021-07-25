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
            postcss: {}
        },
        optimizeDeps: {
            include: [],
            exclude: [],
            keepNames: false
        },
        plugins: [
        // VitePluginGlobInput({
        // })
        ],
        resolve: {
        // alias:[{
        //   find:'@shared',
        //   replacement:'./blazorApp'
        // }]
        }
    };
});
//# sourceMappingURL=vite.shared.config.js.map