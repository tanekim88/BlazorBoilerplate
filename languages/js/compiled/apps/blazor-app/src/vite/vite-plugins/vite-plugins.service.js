var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BlazorAppPaths } from '#blazor-app/paths';
import { BlazorAppEnvironmentService } from '#blazor-app/src/modules/environment/environment/environment.service';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { VitePluginsService } from '#shared/src/vite/vite-plugins/vite-plugins/vite-plugins.service';
import path from 'path';
let BlazorAppVitePluginsService = class BlazorAppVitePluginsService extends VitePluginsService {
    blazorAppEnvironmentService;
    // @CustomInject(VitePluginGlobInputService)
    // protected vitePluginGlobInputService: VitePluginGlobInputService;
    // @CustomInject(VitePluginHtmlService)
    // protected vitePluginHtmlService: VitePluginHtmlService;
    createManyPlugins() {
        return [
            this.vitePluginGlobInputService.createPlugin({
                externalsForHtml: [
                    {
                        html: `
                        <link href="_content/Material.Blazor/material.blazor.min.css" rel="stylesheet" />
                        <link href="_content/Material.Blazor/material-components-web.min.css" rel="stylesheet" />
                    `, insertAt: '@head-start'
                    },
                    { html: '<link href="BlazorApp.Client.styles.css" rel="stylesheet" />', insertAt: '@head-end' },
                    {
                        html: `
                    <script src="_content/Material.Blazor/material.blazor.min.js"></script>
                    <script>
                        MaterialBlazor.MBTooltip.numbers.HIDE_DELAY_MS = 0
                    </script>
                    <script src="_content/Microsoft.AspNetCore.Components.WebAssembly.Authentication/AuthenticationService.js"></script>
                    <script src="_framework/blazor.webassembly.js"></script>
                    <script>navigator.serviceWorker.register("[SERVICEWORKER_PATH]", {type:"module"});</script>
                    `, insertAt: '@body-end'
                    },
                ],
                inputs: [
                    {
                        include: [
                            this.blazorAppEnvironmentService.localPaths.src.templates['index.html'].toAbsolutePath()
                        ],
                        relativeTo: this.blazorAppEnvironmentService.localPaths.src.templates.toAbsolutePath(),
                    },
                    {
                        fromPath: this.blazorAppEnvironmentService.localPaths.src['service-worker']['index.ts'].toAbsolutePath(),
                        toName: 'service-worker.[hash].js',
                        htmlToken: '[SERVICEWORKER_PATH]'
                    },
                ],
                sass: [
                    {
                        fromPath: BlazorAppPaths.Client.Pages.toAbsolutePath()
                    },
                    {
                        fromPath: BlazorAppPaths.Client.Shared.toAbsolutePath()
                    }
                ],
                copy: [
                    {
                        fromPath: path.join(this.blazorAppEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'bootstrap-icons', 'bootstrap-icons.svg'),
                        toRelativePath: 'bootstrap-icons.svg',
                    },
                    {
                        fromPath: this.blazorAppEnvironmentService.localPaths.src.logo['favicon.ico'].toAbsolutePath(),
                        toRelativePath: 'favicon.ico',
                    },
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