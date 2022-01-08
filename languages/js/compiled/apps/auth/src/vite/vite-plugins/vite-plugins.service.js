var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AuthEnvironmentService } from '#auth/src/modules/environment/environment/environment.service';
import { authPaths } from '#root/apps/auth/paths';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { VitePluginsService } from '#shared/src/vite/vite-plugins/vite-plugins/vite-plugins.service';
import path from 'path';
import solidPlugin from 'vite-plugin-solid';
let AuthVitePluginsService = class AuthVitePluginsService extends VitePluginsService {
    authEnvironmentService;
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
                        include: [authPaths.src.templates['_Layout.cshtml'].toAbsolutePath()],
                        relativeTo: authPaths.src.templates.toAbsolutePath(),
                    }
                ],
                copy: [
                    {
                        fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'bootstrap-icons', 'bootstrap-icons.svg'),
                        toRelativePath: 'bootstrap-icons.svg',
                    },
                    {
                        fromPath: this.authEnvironmentService.localPaths.src.logo['favicon.ico'].toAbsolutePath(),
                        toRelativePath: 'favicon.ico',
                    },
                    {
                        fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'jquery/dist'),
                        toRelativePath: 'lib/jquery',
                    },
                    {
                        fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'jquery-validate/dist'),
                        toRelativePath: 'lib/jquery-validate',
                    },
                    {
                        fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'jquery-validation-unobtrusive/dist'),
                        toRelativePath: 'lib/jquery-validation-unobtrusive',
                    },
                ]
            })
        ];
    }
};
__decorate([
    CustomInject(AuthEnvironmentService),
    __metadata("design:type", AuthEnvironmentService
    // @CustomInject(VitePluginGlobInputService)
    // protected vitePluginGlobInputService: VitePluginGlobInputService;
    // @CustomInject(VitePluginHtmlService)
    // protected vitePluginHtmlService: VitePluginHtmlService;
    )
], AuthVitePluginsService.prototype, "authEnvironmentService", void 0);
AuthVitePluginsService = __decorate([
    CustomInjectable()
], AuthVitePluginsService);
export { AuthVitePluginsService };
//# sourceMappingURL=vite-plugins.service.js.map