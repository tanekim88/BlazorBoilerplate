var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { reactAppPaths } from '#react-app/paths';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { ReactAppEnvironmentService } from '#react-app/src/modules/environment/environment/environment.service';
import { ViteSharedService } from '#shared/src/vite/vite-shared/vite-shared.service';
import { ReactAppVitePluginsService } from '../vite-plugins/vite-plugins.service';
import { ReactAppPostcssService } from '#react-app/src/modules/postcss/postcss/postcss.service';
let ReactAppViteSharedService = class ReactAppViteSharedService extends ViteSharedService {
    reactAppEnvironmentService;
    reactAppVitePluginsService;
    reactAppPostcssService;
    createConfiguration(options) {
        const postcssPlugins = this.reactAppPostcssService.createPostcssPlugins();
        const plugins = this.reactAppVitePluginsService.createManyPlugins();
        return this.mergeService.mergeOptions(super.createConfiguration(), {
            build: {
                outDir: reactAppPaths.wwwroot.toAbsolutePath(),
                rollupOptions: {
                    input: [],
                    external: []
                },
                watch: {},
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
        }, options);
    }
};
__decorate([
    CustomInject(ReactAppEnvironmentService),
    __metadata("design:type", ReactAppEnvironmentService)
], ReactAppViteSharedService.prototype, "reactAppEnvironmentService", void 0);
__decorate([
    CustomInject(ReactAppVitePluginsService),
    __metadata("design:type", ReactAppVitePluginsService)
], ReactAppViteSharedService.prototype, "reactAppVitePluginsService", void 0);
__decorate([
    CustomInject(ReactAppPostcssService),
    __metadata("design:type", ReactAppPostcssService)
], ReactAppViteSharedService.prototype, "reactAppPostcssService", void 0);
ReactAppViteSharedService = __decorate([
    CustomInjectable()
], ReactAppViteSharedService);
export { ReactAppViteSharedService };
//# sourceMappingURL=vite-shared.service.js.map