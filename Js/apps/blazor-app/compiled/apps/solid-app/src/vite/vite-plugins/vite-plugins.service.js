var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BlazorAppEnvironmentService } from '#solid-app/src/modules/environment/environment/environment.service';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { VitePluginsService } from '#shared/src/vite/vite-plugins/vite-plugins/vite-plugins.service';
let BlazorAppVitePluginsService = class BlazorAppVitePluginsService extends VitePluginsService {
    blazorAppEnvironmentService;
    // @CustomInject(VitePluginGlobInputService)
    // protected vitePluginGlobInputService: VitePluginGlobInputService;
    // @CustomInject(VitePluginHtmlService)
    // protected vitePluginHtmlService: VitePluginHtmlService;
    createManyPlugins() {
        return [
            this.vitePluginHtmlService.createPlugin({
                externals: [
                    { html: '<link href="_content/Material.Blazor/Material.min.css" rel="stylesheet" />', insertAt: '<head>' },
                    { html: '<link href="_content/Material.Blazor/MaterialBlazor.min.css" rel="stylesheet" />', insertAt: '<head>' },
                    { html: '<link href="BlazorApp.Client.styles.css" rel="stylesheet" />', insertAt: '</head>' },
                    { html: '<script src="_content/Material.Blazor/MaterialBlazor.min.js"></script>', insertAt: '</body>' },
                    {
                        html: `
                        <script>
                            MaterialBlazor.MBTooltip.numbers.HIDE_DELAY_MS = 0
                        </script>
                        `, insertAt: '</body>'
                    },
                    { html: '<script src="_content/Microsoft.AspNetCore.Components.WebAssembly.Authentication/AuthenticationService.js"></script>', insertAt: '</body>' },
                    { html: '<script src="_framework/blazor.webassembly.js"></script>', insertAt: '</body>' },
                    { html: '<script>navigator.serviceWorker.register("service-worker.js");</script>', insertAt: '</body>' },
                ]
            }),
            this.vitePluginGlobInputService.createPlugin({
                inputs: [
                    {
                        include: [this.blazorAppEnvironmentService.localPaths.src.templates['index.html'].toAbsolutePath()],
                        relativeTo: this.blazorAppEnvironmentService.localPaths.src.templates.toAbsolutePath(),
                    }
                ]
            })
        ];
    }
};
__decorate([
    CustomInject(BlazorAppEnvironmentService),
    __metadata("design:type", BlazorAppEnvironmentService
    // @CustomInject(VitePluginGlobInputService)
    // protected vitePluginGlobInputService: VitePluginGlobInputService;
    // @CustomInject(VitePluginHtmlService)
    // protected vitePluginHtmlService: VitePluginHtmlService;
    )
], BlazorAppVitePluginsService.prototype, "blazorAppEnvironmentService", void 0);
BlazorAppVitePluginsService = __decorate([
    CustomInjectable()
], BlazorAppVitePluginsService);
export { BlazorAppVitePluginsService };
//# sourceMappingURL=vite-plugins.service.js.map