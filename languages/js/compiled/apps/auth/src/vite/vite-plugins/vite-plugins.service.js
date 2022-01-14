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
import { AuthPaths, authPaths } from '#root/apps/auth/paths';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { VitePluginsService } from '#shared/src/vite/vite-plugins/vite-plugins/vite-plugins.service';
import path from 'path';
import solidPlugin from 'vite-plugin-solid';
import { sharedPaths } from '#root/apps/shared';
let AuthVitePluginsService = class AuthVitePluginsService extends VitePluginsService {
    authEnvironmentService;
    // @CustomInject(VitePluginGlobInputService)
    // protected vitePluginGlobInputService: VitePluginGlobInputService;
    // @CustomInject(VitePluginHtmlService)
    // protected vitePluginHtmlService: VitePluginHtmlService;
    createManyPlugins() {
        return [
            // VitePWA({}),
            solidPlugin(),
            ...this.vitePluginGlobInputService.createManyPlugins({
                sass: [
                    {
                        fromPath: AuthPaths.Pages.toAbsolutePath()
                    },
                ],
                inputs: [
                    {
                        fromPath: authPaths.src.web['_Layout.cshtml'].toAbsolutePath(),
                        toRelativePath: path.join(AuthPaths.Pages.Shared.toRelativePath(AuthPaths.wwwroot.toAbsolutePath()), '_Layout.cshtml'),
                        baseName: '~/',
                        extrenals: [
                            // {
                            //     html: `
                            //     <link href="_content/Material.Blazor/material.blazor.min.css" rel="stylesheet" />
                            //     <link href="_content/Material.Blazor/material-components-web.min.css" rel="stylesheet" />
                            // `, insertAt: '@head-start'
                            // },
                            // { html: '<link href="BlazorApp.Client.styles.css" rel="stylesheet" />', insertAt: '@head-end' },
                            // {
                            //     html: `
                            // <script src="_content/Material.Blazor/material.blazor.min.js"></script>
                            // <script>
                            //     MaterialBlazor.MBTooltip.numbers.HIDE_DELAY_MS = 0
                            // </script>
                            // <script src="_content/Microsoft.AspNetCore.Components.WebAssembly.Authentication/AuthenticationService.js"></script>
                            // <script src="_framework/blazor.webassembly.js"></script>
                            // <script>navigator.serviceWorker.register("[SERVICEWORKER_PATH]", {type:"module"});</script>
                            // `, insertAt: '@body-end'
                            // },
                            {
                                insertAt: '@head-start',
                                scripts: [
                                    sharedPaths.src.web.material.native.components.button['index.ts'].toAbsolutePath()
                                ]
                            }
                        ],
                    },
                ],
                copy: [
                // {
                //     fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'bootstrap-icons', 'bootstrap-icons.svg'),
                //     toRelativePath: 'bootstrap-icons.svg',
                //     watch: false
                // },
                // {
                //     fromPath: authPaths.src.logo['favicon.ico'].toAbsolutePath(),
                //     toRelativePath: 'favicon.ico',
                //     watch: false
                // },
                // {
                //     fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'jquery/dist'),
                //     toRelativePath: 'lib/jquery',
                //     watch: false
                // },
                // {
                //     fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'jquery-validation/dist'),
                //     toRelativePath:  'lib/jquery-validation',
                //     watch: false
                // },
                // {
                //     fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'jquery-validation-unobtrusive/dist'),
                //     toRelativePath: 'lib/jquery-validation-unobtrusive',
                //     watch: false
                // },
                ],
                empty: [
                    {
                        fromPath: AuthPaths.wwwroot.toAbsolutePath(),
                    }
                ]
            }),
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