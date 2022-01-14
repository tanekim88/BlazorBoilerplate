var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AuthPaths } from '#auth/paths';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { AuthEnvironmentService } from '#auth/src/modules/environment/environment/environment.service';
import { ViteSharedService } from '#shared/src/vite/vite-shared/vite-shared.service';
import { AuthVitePluginsService } from '../vite-plugins/vite-plugins.service';
import { AuthPostcssService } from '#auth/src/modules/postcss/postcss/postcss.service';
import { sharedPaths } from '#root/apps/shared';
let AuthViteSharedService = class AuthViteSharedService extends ViteSharedService {
    authEnvironmentService;
    authVitePluginsService;
    authPostcssService;
    createConfiguration(options) {
        const postcssPlugins = this.authPostcssService.createPostcssPlugins();
        const plugins = this.authVitePluginsService.createManyPlugins();
        return this.mergeService.mergeOptions(super.createConfiguration(), {
            base: '/',
            build: {
                outDir: AuthPaths.wwwroot.toAbsolutePath(),
                // assetsDir:'assets',
                rollupOptions: {
                    input: [],
                    external: []
                },
                watch: {},
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
            resolve: {
                alias: {
                    '#shared': sharedPaths.toAbsolutePath()
                }
            }
        }, options);
    }
};
__decorate([
    CustomInject(AuthEnvironmentService),
    __metadata("design:type", AuthEnvironmentService)
], AuthViteSharedService.prototype, "authEnvironmentService", void 0);
__decorate([
    CustomInject(AuthVitePluginsService),
    __metadata("design:type", AuthVitePluginsService)
], AuthViteSharedService.prototype, "authVitePluginsService", void 0);
__decorate([
    CustomInject(AuthPostcssService),
    __metadata("design:type", AuthPostcssService)
], AuthViteSharedService.prototype, "authPostcssService", void 0);
AuthViteSharedService = __decorate([
    CustomInjectable()
], AuthViteSharedService);
export { AuthViteSharedService };
//# sourceMappingURL=vite-shared.service.js.map