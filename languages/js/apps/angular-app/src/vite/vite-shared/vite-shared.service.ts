

import { angularAppPaths } from '#angular-app/paths';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { UserConfig } from 'vite';

import { AngularAppEnvironmentService } from '#angular-app/src/modules/environment/environment/environment.service';
import { ViteSharedService } from '#shared/src/vite/vite-shared/vite-shared.service';
import { AngularAppVitePluginsService } from '../vite-plugins/vite-plugins.service';
import { AngularAppPostcssService } from '#angular-app/src/modules/postcss/postcss/postcss.service';
@CustomInjectable()
export class AngularAppViteSharedService extends ViteSharedService {
    @CustomInject(AngularAppEnvironmentService)
    protected angularAppEnvironmentService: AngularAppEnvironmentService;
    @CustomInject(AngularAppVitePluginsService)
    protected angularAppVitePluginsService: AngularAppVitePluginsService;
    @CustomInject(AngularAppPostcssService)
    protected angularAppPostcssService: AngularAppPostcssService;
    createConfiguration(options?: UserConfig) {
        const postcssPlugins = this.angularAppPostcssService.createPostcssPlugins();
        const plugins = this.angularAppVitePluginsService.createManyPlugins();
        return this.mergeService.mergeOptions(
            super.createConfiguration(), {
                build: {
                    outDir: angularAppPaths.wwwroot.toAbsolutePath(),
                    rollupOptions: {
                        input: angularAppPaths.app['index.html'].toAbsolutePath(),
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
