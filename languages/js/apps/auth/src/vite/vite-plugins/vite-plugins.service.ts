import { AuthEnvironmentService } from '#auth/src/modules/environment/environment/environment.service';
import { AuthPaths, authPaths } from '#root/apps/auth/paths';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';

import { VitePluginsService } from '#shared/src/vite/vite-plugins/vite-plugins/vite-plugins.service';
import path from 'path';
import solidPlugin from 'vite-plugin-solid';
import { Plugin } from 'vite';
@CustomInjectable()
export class AuthVitePluginsService extends VitePluginsService {
    @CustomInject(AuthEnvironmentService)
    authEnvironmentService: AuthEnvironmentService

    // @CustomInject(VitePluginGlobInputService)
    // protected vitePluginGlobInputService: VitePluginGlobInputService;

    // @CustomInject(VitePluginHtmlService)
    // protected vitePluginHtmlService: VitePluginHtmlService;
    createManyPlugins(): Plugin[] {

        return [
            solidPlugin(),
            ...this.vitePluginGlobInputService.createManyPlugins({
                externalsForHtml: [
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
                ],
                sass: [
                    {
                        fromPath: AuthPaths.Pages.toAbsolutePath()
                    },
                ],
                inputs: [
                    {
                        fromPath: authPaths.src.templates['_Layout.cshtml'].toAbsolutePath(),
                        toRelativePath: path.join(AuthPaths.Pages.Shared.toRelativePath(AuthPaths.toAbsolutePath()), '_Layout.cshtml')
                    },
                    {
                        fromPath: this.authEnvironmentService.localPaths.src['service-worker']['index.ts'].toAbsolutePath(),
                        htmlToken: '[SERVICEWORKER_PATH]',
                        toRelativePath: path.join(AuthPaths.wwwroot.toRelativePath(AuthPaths.toAbsolutePath()), 'service-worker.[hash].js')
                    },
                ],
                copy: [
                    {
                        fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'bootstrap-icons', 'bootstrap-icons.svg'),
                        toRelativePath: path.join(AuthPaths.wwwroot.toRelativePath(AuthPaths.toAbsolutePath()), 'bootstrap-icons.svg'),
                    
                    },
                    {
                        fromPath: authPaths.src.logo['favicon.ico'].toAbsolutePath(),
                        toRelativePath: path.join(AuthPaths.wwwroot.toRelativePath(AuthPaths.toAbsolutePath()), 'favicon.ico'),
                    },
                    {
                        fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'jquery/dist'),
                        toRelativePath: path.join(AuthPaths.wwwroot.toRelativePath(AuthPaths.toAbsolutePath()), 'lib/jquery'),
                    },
                    {
                        fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'jquery-validation/dist'),
                        toRelativePath: path.join(AuthPaths.wwwroot.toRelativePath(AuthPaths.toAbsolutePath()), 'lib/jquery-validation'),
                    },
                    {
                        fromPath: path.join(this.authEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'jquery-validation-unobtrusive/dist'),
                        toRelativePath: path.join(AuthPaths.wwwroot.toRelativePath(AuthPaths.toAbsolutePath()), 'lib/jquery-validation-unobtrusive'),
                    },
                ],
                empty: [
                    {
                        fromPath: AuthPaths.wwwroot.toAbsolutePath(),
                    }
                ]
            }),
        ]
    }

}
