var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomInjectable } from '#shared/src/functions/process-providers';
let VitePluginsService = class VitePluginsService {
    // @CustomInject(EnvironmentService)
    // protected environmentService: EnvironmentService;
    // @CustomInject(VitePluginGlobInputService)
    // protected vitePluginGlobInputService: VitePluginGlobInputService;
    createManyPlugins() {
        let plugins = [];
        // prePlugins.push(this.webpackWebpackWatchFilesPluginService.createPlugin());
        // plugins.push(this.vitePluginGlobInputService.createPlugin());
        return plugins;
    }
};
VitePluginsService = __decorate([
    CustomInjectable()
], VitePluginsService);
export { VitePluginsService };
//# sourceMappingURL=vite-plugins.service.js.map