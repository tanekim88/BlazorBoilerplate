

import { solidAppPaths } from '#solid-app/paths';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { UserConfig } from 'vite';

import { SolidAppEnvironmentService } from '#solid-app/src/modules/environment/environment/environment.service';
import { ViteSharedService } from '#shared/src/vite/vite-shared/vite-shared.service';
import { SolidAppVitePluginsService } from '../vite-plugins/vite-plugins.service';
import { SolidAppPostcssService } from '#solid-app/src/modules/postcss/postcss/postcss.service';
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
                        input: solidAppPaths.app['index.html'].toAbsolutePath(),
                        external: []
                    },
                    watch: {

                    },
                    assetsInlineLimit: 4096,
                    cssCodeSplit: true,
                    sourcemap: true,
                    minify: false,
                    emptyOutDir: true,
                    polyfillDynamicImport: false,
                    target: 'esnext',
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
