

import { AuthPaths, authPaths } from '#auth/paths';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { UserConfig } from 'vite';

import { AuthEnvironmentService } from '#auth/src/modules/environment/environment/environment.service';
import { ViteSharedService } from '#shared/src/vite/vite-shared/vite-shared.service';
import { AuthVitePluginsService } from '../vite-plugins/vite-plugins.service';
import { AuthPostcssService } from '#auth/src/modules/postcss/postcss/postcss.service';
import { join } from 'path/posix';
import { sharedPaths } from '#root/apps/shared';
@CustomInjectable()
export class AuthViteSharedService extends ViteSharedService {
    @CustomInject(AuthEnvironmentService)
    protected authEnvironmentService: AuthEnvironmentService;
    @CustomInject(AuthVitePluginsService)
    protected authVitePluginsService: AuthVitePluginsService;
    @CustomInject(AuthPostcssService)
    protected authPostcssService: AuthPostcssService;
    createConfiguration(options?: UserConfig) {
        const postcssPlugins = this.authPostcssService.createPostcssPlugins();
        const plugins = this.authVitePluginsService.createManyPlugins();
        return this.mergeService.mergeOptions(
            super.createConfiguration(), {
                base:'/',
                build: {
                    outDir: AuthPaths.wwwroot.toAbsolutePath(),
                    // assetsDir:'assets',
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
                    emptyOutDir: false,
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
                },
                resolve:{
                    alias:{
                        '#shared': sharedPaths.toAbsolutePath()
                    }
                }
            } as UserConfig,
            options,
        );
    }
}
