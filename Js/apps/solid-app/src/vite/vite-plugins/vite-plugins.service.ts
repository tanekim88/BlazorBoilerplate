import { BlazorAppEnvironmentService } from '#solid-app/src/modules/environment/environment/environment.service';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';

import { VitePluginsService } from '#shared/src/vite/vite-plugins/vite-plugins/vite-plugins.service';

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
        ]
    }

}
