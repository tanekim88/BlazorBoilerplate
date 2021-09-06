

import { solidAppPaths } from '#solid-app/paths';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { ViteBaseService } from '#shared/src/vite/vite-base/vite-base.service';
import { UserConfig } from 'vite';
import path from 'path';

import { SolidAppEnvironmentService } from '#solid-app/src/modules/environment/environment/environment.service';
import { ViteSharedService } from '#shared/src/vite/vite-shared/vite-shared.service';
import { SolidAppVitePluginsService } from '../vite-plugins/vite-plugins.service';
import { RootPaths, rootPaths } from '#root/paths';
import { PostcssService } from '#shared/src/modules/postcss/postcss/postcss.service';
import { SolidAppPostcssService } from '#solid-app/src/modules/postcss/postcss/postcss.service';
@CustomInjectable()
export class SolidAppViteSharedService extends ViteSharedService {
    @CustomInject(SolidAppEnvironmentService)
    protected blazorAppEnvironmentService: SolidAppEnvironmentService;
    @CustomInject(SolidAppVitePluginsService)
    protected blazorAppVitePluginsService: SolidAppVitePluginsService;
    @CustomInject(SolidAppPostcssService)
    protected blazorAppPostcssService: SolidAppPostcssService;
    createConfiguration(options?: UserConfig) {
        const postcssPlugins = this.blazorAppPostcssService.createPostcssPlugins();
        const plugins = this.blazorAppVitePluginsService.createManyPlugins();
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
