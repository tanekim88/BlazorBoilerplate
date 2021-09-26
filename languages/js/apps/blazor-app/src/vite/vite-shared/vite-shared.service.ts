

import { blazorAppPaths, BlazorAppPaths } from '@projects/blazor-app/paths';
import { CustomInject, CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { ViteBaseService } from '@projects/shared/src/vite/vite-base/vite-base.service';
import { UserConfig } from 'vite';
import path from 'path';

import { BlazorAppEnvironmentService } from '@projects/blazor-app/src/modules/environment/environment/environment.service';
import { ViteSharedService } from '@projects/shared/src/vite/vite-shared/vite-shared.service';
import { BlazorAppVitePluginsService } from '../vite-plugins/vite-plugins.service';
import { RootPaths, rootPaths } from '@projects/root/paths';
import { PostcssService } from '@projects/shared/src/modules/postcss/postcss.service';
import { BlazorAppPostcssService } from '@projects/blazor-app/src/modules/postcss/postcss/postcss.service';
import { MergeCommand } from '@projects/shared/src/modules/utilities/modules/merge/merge/merge-command';
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
}
