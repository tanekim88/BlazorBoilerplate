

import { solidAppPaths } from '@projects/solid-app/paths';
import { CustomInject, CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { ViteBaseService } from '@projects/shared/src/vite/vite-base/vite-base.service';
import { UserConfig } from 'vite';
import path from 'path';

import { SolidAppEnvironmentService } from '@projects/solid-app/src/modules/environment/environment/environment.service';
import { ViteSharedService } from '@projects/shared/src/vite/vite-shared/vite-shared.service';
import { SolidAppVitePluginsService } from '../vite-plugins/vite-plugins.service';
import { RootPaths, rootPaths } from '@projects/root/paths';
import { PostcssService } from '@projects/shared/src/modules/postcss/postcss.service';
import { SolidAppPostcssService } from '@projects/solid-app/src/modules/postcss/postcss/postcss.service';
@CustomInjectable()
export class SolidAppViteSharedService extends ViteSharedService {
    @CustomInject(SolidAppEnvironmentService)
    protected solidAppEnvironmentService: SolidAppEnvironmentService;
    @CustomInject(SolidAppVitePluginsService)
    protected solidAppVitePluginsService: SolidAppVitePluginsService;
    @CustomInject(SolidAppPostcssService)
    protected solidAppPostcssService: SolidAppPostcssService;
    createConfiguration(options?: UserConfig) {
        const postcssPlugins = this.solidAppPostcssService.createPostcssPlugins();
        const plugins = this.solidAppVitePluginsService.createManyPlugins();
        return this.mergeService.mergeOptions(
            super.createConfiguration(), {

                build: {
                    outDir: solidAppPaths.wwwroot.toAbsolutePath(),
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
