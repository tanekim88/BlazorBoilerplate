

import { reactAppPaths } from '#react-app/paths';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { ViteBaseService } from '#shared/src/vite/vite-base/vite-base.service';
import { UserConfig } from 'vite';
import path from 'path';

import { ReactAppEnvironmentService } from '#react-app/src/modules/environment/environment/environment.service';
import { ViteSharedService } from '#shared/src/vite/vite-shared/vite-shared.service';
import { ReactAppVitePluginsService } from '../vite-plugins/vite-plugins.service';
import { RootPaths, rootPaths } from '#root/paths';
import { PostcssService } from '#shared/src/modules/postcss/postcss.service';
import { ReactAppPostcssService } from '#react-app/src/modules/postcss/postcss/postcss.service';
@CustomInjectable()
export class ReactAppViteSharedService extends ViteSharedService {
    @CustomInject(ReactAppEnvironmentService)
    protected reactAppEnvironmentService: ReactAppEnvironmentService;
    @CustomInject(ReactAppVitePluginsService)
    protected reactAppVitePluginsService: ReactAppVitePluginsService;
    @CustomInject(ReactAppPostcssService)
    protected reactAppPostcssService: ReactAppPostcssService;
    createConfiguration(options?: UserConfig) {
        const postcssPlugins = this.reactAppPostcssService.createPostcssPlugins();
        const plugins = this.reactAppVitePluginsService.createManyPlugins();
        return this.mergeService.mergeOptions(
            super.createConfiguration(), {

                build: {
                    outDir: reactAppPaths.wwwroot.toAbsolutePath(),
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
