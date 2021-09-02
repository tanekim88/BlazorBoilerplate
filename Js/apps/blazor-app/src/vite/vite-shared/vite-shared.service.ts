

import { BlazorAppPaths, blazorAppPaths } from '#blazor-app/paths';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { ViteBaseService } from '#shared/src/vite/vite-base/vite-base.service';
import { UserConfig } from 'vite';
import path from 'path';

import { BlazorAppEnvironmentService } from '#blazor-app/src/modules/environment/environment/environment.service';
import { ViteSharedService } from '#shared/src/vite/vite-shared/vite-shared.service';
@CustomInjectable()
export class BlazorAppViteSharedService extends ViteSharedService {
    @CustomInject(BlazorAppEnvironmentService)
    protected blazorAppEnvironmentService: BlazorAppEnvironmentService;

    createConfiguration(options?: UserConfig) {
        return this.mergeService.mergeOptions(
            super.createConfiguration(), {
                root: blazorAppPaths.toAbsolutePath(),
                build: {
                    outDir: BlazorAppPaths.wwwroot.toAbsolutePath(),
                    rollupOptions: {
                        input: [
                            this.blazorAppEnvironmentService.localPaths.src.templates['index.html'].toAbsolutePath()
                        ],
                        external: [
 
                        ]
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
                    emptyOutDir: true
                },
                server: {
                    port: 4010
                },
                optimizeDeps: {
                    keepNames: true,
                }
            } as UserConfig,
            options,
        );
    }
}
