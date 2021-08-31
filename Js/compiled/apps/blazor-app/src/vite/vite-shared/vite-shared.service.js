var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BlazorAppPaths, blazorAppPaths } from '#blazor-app/paths';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import path from 'path';
import { BlazorAppEnvironmentService } from '#blazor-app/src/modules/environment/environment/environment.service';
import { ViteSharedService } from '#shared/src/vite/vite-shared/vite-shared.service';
let BlazorAppViteSharedService = class BlazorAppViteSharedService extends ViteSharedService {
    blazorAppEnvironmentService;
    createConfiguration(options) {
        return this.mergeService.mergeOptions(super.createConfiguration(), {
            root: blazorAppPaths.toAbsolutePath(),
            plugins: [],
        }, options);
    }
    createTsToJsConfiguration() {
        const toReturn = this.createConfiguration({
            root: blazorAppPaths.toAbsolutePath(),
            build: {
                outDir: BlazorAppPaths.wwwroot.toAbsolutePath(),
                rollupOptions: {
                    input: [
                        path.resolve(this.blazorAppEnvironmentService.LocalPaths.toAbsolutePath(), '*.ts'),
                    ],
                },
                watch: {},
                assetsInlineLimit: 4096,
                cssCodeSplit: false,
                sourcemap: false,
                minify: false,
                cleanCssOptions: {
                    format: 'beautify'
                }
            },
            server: {
                port: 4010
            },
            optimizeDeps: {
                keepNames: true,
            }
        });
        return toReturn;
    }
    createManyConfigurations() {
        return [
            this.createTsToJsConfiguration()
        ];
    }
};
__decorate([
    CustomInject(BlazorAppEnvironmentService),
    __metadata("design:type", BlazorAppEnvironmentService)
], BlazorAppViteSharedService.prototype, "blazorAppEnvironmentService", void 0);
BlazorAppViteSharedService = __decorate([
    CustomInjectable()
], BlazorAppViteSharedService);
export { BlazorAppViteSharedService };
//# sourceMappingURL=vite-shared.service.js.map