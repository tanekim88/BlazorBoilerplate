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
                externals: [
                    {
                        html: `
                        <link href="_content/Material.Blazor/material.blazor.min.css" rel="stylesheet" />
                        <link href="_content/Material.Blazor/material-components-web.min.css" rel="stylesheet" />
                    `, insertAt: '<head>'
                    },
                    { html: '<link href="BlazorApp.Client.styles.css" rel="stylesheet" />', insertAt: '</head>' },
                    {
                        html: `
                    <script src="_content/Material.Blazor/material.blazor.min.js"></script>
                    <script>
                        MaterialBlazor.MBTooltip.numbers.HIDE_DELAY_MS = 0
                    </script>
                    <script src="_content/Microsoft.AspNetCore.Components.WebAssembly.Authentication/AuthenticationService.js"></script>
                    <script src="_framework/blazor.webassembly.js"></script>
                    <script>navigator.serviceWorker.register("[SERVICEWORKER_PATH]", {type:"module"});</script>
                    `, insertAt: '</body>'
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
                    {
                        fromPath: path.join(this.blazorAppEnvironmentService.localPaths['node_modules'].toAbsolutePath(), 'bootstrap-icons', 'bootstrap-icons.svg'),
                        toRelativePath: 'bootstrap-icons.svg',
                        action: 'copy',
                    },
                    {
                        fromPath: this.blazorAppEnvironmentService.localPaths.src.logo['favicon.ico'].toAbsolutePath(),
                        toRelativePath: 'favicon.ico',
                        action: 'copy',
                    },
                    {
                        include: [
                            path.join(BlazorAppPaths.Client.toAbsolutePath(), '**/*.scss')
                        ],
                        relativeTo: BlazorAppPaths.Client.toAbsolutePath()
                    }
                ]
            })
        ]
    }




    createManyPluginsForSass() {
        return [
            this.vitePluginGlobInputService.createPlugin({
                inputs: [
                    {
                        include: [
                            path.join(BlazorAppPaths.Client.toAbsolutePath(), '**/*.scss')
                        ],
                        relativeTo: BlazorAppPaths.Client.toAbsolutePath(),
                    }
                ]
            })
        ]
    }

}

