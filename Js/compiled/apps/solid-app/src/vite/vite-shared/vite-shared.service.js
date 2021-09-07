var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { solidAppPaths } from '#solid-app/paths';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { BlazorAppEnvironmentService } from '#solid-app/src/modules/environment/environment/environment.service';
import { ViteSharedService } from '#shared/src/vite/vite-shared/vite-shared.service';
import { BlazorAppVitePluginsService } from '../vite-plugins/vite-plugins.service';
import { BlazorAppPostcssService } from '#solid-app/src/modules/postcss/postcss/postcss.service';
let BlazorAppViteSharedService = class BlazorAppViteSharedService extends ViteSharedService {
    blazorAppEnvironmentService;
    blazorAppVitePluginsService;
    blazorAppPostcssService;
    createConfiguration(options) {
        const postcssPlugins = this.blazorAppPostcssService.createPostcssPlugins();
        const plugins = this.blazorAppVitePluginsService.createManyPlugins();
        return this.mergeService.mergeOptions(super.createConfiguration(), {
            build: {
                outDir: solidAppPaths.wwwroot.toAbsolutePath(),
                rollupOptions: {
                    input: [],
                    external: []
                },
                watch: {},
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
        }, options);
    }
};
__decorate([
    CustomInject(BlazorAppEnvironmentService),
    __metadata("design:type", BlazorAppEnvironmentService)
], BlazorAppViteSharedService.prototype, "blazorAppEnvironmentService", void 0);
__decorate([
    CustomInject(BlazorAppVitePluginsService),
    __metadata("design:type", BlazorAppVitePluginsService)
], BlazorAppViteSharedService.prototype, "blazorAppVitePluginsService", void 0);
__decorate([
    CustomInject(BlazorAppPostcssService),
    __metadata("design:type", BlazorAppPostcssService)
], BlazorAppViteSharedService.prototype, "blazorAppPostcssService", void 0);
BlazorAppViteSharedService = __decorate([
    CustomInjectable()
], BlazorAppViteSharedService);
export { BlazorAppViteSharedService };
//# sourceMappingURL=vite-shared.service.js.map