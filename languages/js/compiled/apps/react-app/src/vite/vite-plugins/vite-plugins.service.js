var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ReactAppEnvironmentService } from '#react-app/src/modules/environment/environment/environment.service';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { VitePluginsService } from '#shared/src/vite/vite-plugins/vite-plugins/vite-plugins.service';
let ReactAppVitePluginsService = class ReactAppVitePluginsService extends VitePluginsService {
    reactAppEnvironmentService;
    // @CustomInject(VitePluginGlobInputService)
    // protected vitePluginGlobInputService: VitePluginGlobInputService;
    // @CustomInject(VitePluginHtmlService)
    // protected vitePluginHtmlService: VitePluginHtmlService;
    createManyPlugins() {
        return [
            this.vitePluginGlobInputService.createPlugin({
                inputs: [
                    {
                        include: [this.reactAppEnvironmentService.localPaths.src.templates['index.html'].toAbsolutePath()],
                        relativeTo: this.reactAppEnvironmentService.localPaths.src.templates.toAbsolutePath(),
                    }
                ]
            })
        ];
    }
};
__decorate([
    CustomInject(ReactAppEnvironmentService),
    __metadata("design:type", ReactAppEnvironmentService
    // @CustomInject(VitePluginGlobInputService)
    // protected vitePluginGlobInputService: VitePluginGlobInputService;
    // @CustomInject(VitePluginHtmlService)
    // protected vitePluginHtmlService: VitePluginHtmlService;
    )
], ReactAppVitePluginsService.prototype, "reactAppEnvironmentService", void 0);
ReactAppVitePluginsService = __decorate([
    CustomInjectable()
], ReactAppVitePluginsService);
export { ReactAppVitePluginsService };
//# sourceMappingURL=vite-plugins.service.js.map