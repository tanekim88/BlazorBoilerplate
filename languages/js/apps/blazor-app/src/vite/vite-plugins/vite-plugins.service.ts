import { BlazorAppPaths, blazorAppPaths } from '#blazor-app/paths';
import { BlazorAppEnvironmentService } from '#blazor-app/src/modules/environment/environment/environment.service';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';

import { VitePluginsService } from '#shared/src/vite/vite-plugins/vite-plugins/vite-plugins.service';
import path from 'path';
@CustomInjectable()
export class BlazorAppVitePluginsService extends VitePluginsService {
    @CustomInject(BlazorAppEnvironmentService)
    blazorAppEnvironmentService: BlazorAppEnvironmentService

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
        ]
    }
}

