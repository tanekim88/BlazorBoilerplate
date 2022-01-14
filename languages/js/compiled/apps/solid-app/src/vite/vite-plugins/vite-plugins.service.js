var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { SolidAppEnvironmentService } from '#solid-app/src/modules/environment/environment/environment.service';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { VitePluginsService } from '#shared/src/vite/vite-plugins/vite-plugins/vite-plugins.service';
import solidPlugin from 'vite-plugin-solid';
let SolidAppVitePluginsService = class SolidAppVitePluginsService extends VitePluginsService {
    solidAppEnvironmentService;
    // @CustomInject(VitePluginGlobInputService)
    // protected vitePluginGlobInputService: VitePluginGlobInputService;
    // @CustomInject(VitePluginHtmlService)
    // protected vitePluginHtmlService: VitePluginHtmlService;
    createManyPlugins() {
        return [
            solidPlugin(),
            this.vitePluginGlobInputService.createPlugin({
                inputs: [
                    {
                        include: [this.solidAppEnvironmentService.localPaths.src.web['index.html'].toAbsolutePath()],
                        relativeTo: this.solidAppEnvironmentService.localPaths.src.web.toAbsolutePath(),
                    }
                ]
            })
        ];
    }
};
__decorate([
    CustomInject(SolidAppEnvironmentService),
    __metadata("design:type", SolidAppEnvironmentService
    // @CustomInject(VitePluginGlobInputService)
    // protected vitePluginGlobInputService: VitePluginGlobInputService;
    // @CustomInject(VitePluginHtmlService)
    // protected vitePluginHtmlService: VitePluginHtmlService;
    )
], SolidAppVitePluginsService.prototype, "solidAppEnvironmentService", void 0);
SolidAppVitePluginsService = __decorate([
    CustomInjectable()
], SolidAppVitePluginsService);
export { SolidAppVitePluginsService };
//# sourceMappingURL=vite-plugins.service.js.map