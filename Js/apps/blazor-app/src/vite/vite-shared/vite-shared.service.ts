

import { BlazorAppPaths, blazorAppPaths } from '#blazor-app/paths';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { ViteBaseService } from '#shared/src/vite/vite-base/vite-base.service';
import { UserConfig } from 'vite';
import path from 'path';

import { BlazorAppEnvironmentService } from '#blazor-app/src/modules/environment/environment/environment.service';
import { ViteSharedService } from '#shared/src/vite/vite-shared/vite-shared.service';
import { BlazorAppVitePluginsService } from '../vite-plugins/vite-plugins.service';
import { RootPaths, rootPaths } from '#root/paths';
@CustomInjectable()
export class BlazorAppViteSharedService extends ViteSharedService {
    @CustomInject(BlazorAppEnvironmentService)
    protected blazorAppEnvironmentService: BlazorAppEnvironmentService;
    @CustomInject(BlazorAppVitePluginsService)
    protected blazorAppVitePluginsService: BlazorAppVitePluginsService;
    createConfiguration(options?: UserConfig) {
        const plugins = this.blazorAppVitePluginsService.createManyPlugins();
        return this.mergeService.mergeOptions(
            super.createConfiguration(), {
 
                build: {
                    outDir: BlazorAppPaths.wwwroot.toAbsolutePath(),
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
                    cleanCssOptions: {
                        format: 'beautify'
                    },
                    emptyOutDir: true,
                    
                },
                server: {
                    port: 4010
                },
                optimizeDeps: {
                    keepNames: true,
                },
                plugins,
                css:{
                    // postcss
                }
            } as UserConfig,
            options,
        );
    }
}
