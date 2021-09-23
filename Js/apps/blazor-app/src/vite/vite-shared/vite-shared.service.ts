

import { blazorAppPaths, BlazorAppPaths } from '#blazor-app/paths';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { ViteBaseService } from '#shared/src/vite/vite-base/vite-base.service';
import { UserConfig } from 'vite';
import path from 'path';

import { BlazorAppEnvironmentService } from '#blazor-app/src/modules/environment/environment/environment.service';
import { ViteSharedService } from '#shared/src/vite/vite-shared/vite-shared.service';
import { BlazorAppVitePluginsService } from '../vite-plugins/vite-plugins.service';
import { RootPaths, rootPaths } from '#root/paths';
import { PostcssService } from '#shared/src/modules/postcss/postcss.service';
import { BlazorAppPostcssService } from '#blazor-app/src/modules/postcss/postcss/postcss.service';
import { MergeCommand } from '#shared/src/modules/utilities/modules/merge/merge/merge-command';
@CustomInjectable()
export class BlazorAppViteSharedService extends ViteSharedService {
    @CustomInject(BlazorAppEnvironmentService)
    protected blazorAppEnvironmentService: BlazorAppEnvironmentService;
    @CustomInject(BlazorAppVitePluginsService)
    protected blazorAppVitePluginsService: BlazorAppVitePluginsService;
    @CustomInject(BlazorAppPostcssService)
    protected blazorAppPostcssService: BlazorAppPostcssService;
    createConfiguration(options?: UserConfig) {
        const postcssPlugins = this.blazorAppPostcssService.createPostcssPlugins();
        const plugins = this.blazorAppVitePluginsService.createManyPlugins();
        return this.mergeService.mergeOptions(
            super.createConfiguration(), {
                logLevel: 'error',
                build: {
                    outDir: BlazorAppPaths.Client.wwwroot.toAbsolutePath(),
                    rollupOptions: {
                        input: [],
                        external: []
                    },
                    watch: {

                    },
                    assetsInlineLimit: 4096,
                    cssCodeSplit: true,
                    sourcemap: true,
                    minify: false,
                    emptyOutDir: true,

                },
                server: {
                    port: 4010
                },
                optimizeDeps: {
                    esbuildOptions: {
                        keepNames: true,
                    }
                },
                plugins,
                css: {
                    postcss: {
                        plugins: postcssPlugins
                    }
                }
            } as UserConfig,
            options,
        );
    }

    createConfigurationForScss(options?: UserConfig) {
        const plugins = this.blazorAppVitePluginsService.createManyPluginsForSass();
        return this.mergeService.mergeOptions(
            this.createConfiguration(),
            {
                build: {
                    outDir: BlazorAppPaths.Client.toAbsolutePath(),
                    // rollupOptions: {
                    //     output:{
                    //         entryFileNames: '[name].js',
                    //         assetFileNames: '[name].[ext]',
                    //         chunkFileNames: '[name].js'
                    //     }
                    // },
                    // watch: {

                    // },
                    // cssCodeSplit: false,
                },
                plugins: [
                    MergeCommand.overwrite(
                        plugins
                    ),
                ]
            } as UserConfig,
            options,
        );
    }
}
