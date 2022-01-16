import { BlazorAppPaths, blazorAppPaths } from '#blazor-app/paths';
import { BlazorAppEnvironmentService } from '#blazor-app/src/modules/environment/environment/environment.service';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';

import { VitePluginsService } from '#shared/src/vite/vite-plugins/vite-plugins/vite-plugins.service';
import path from 'path';
import glob from 'glob';
import { sharedPaths } from '#root/apps/shared';
import { AuthPaths } from '#root/apps/auth/paths';
@CustomInjectable()
export class BlazorAppVitePluginsService extends VitePluginsService {
    @CustomInject(BlazorAppEnvironmentService)
    blazorAppEnvironmentService: BlazorAppEnvironmentService

    createManyPlugins() {
        const dirPath = sharedPaths.src.web.material.components.toAbsolutePath();

        const indexFiles = glob.sync(path.join(dirPath, '**/index.ts'));

        const htmls = indexFiles.map(html => `<script async type="module" src="${html}"></script>`);

        return [
            ...this.vitePluginGlobInputService.createManyPlugins({
                webDir: blazorAppPaths.src.web.toAbsolutePath(),
                inputs: [
                    {
                        include: [
                            this.blazorAppEnvironmentService.localPaths.src.web['index.html'].toAbsolutePath()
                        ],
                        relativeTo: this.blazorAppEnvironmentService.localPaths.src.web.toAbsolutePath(),
                        externals: [
                            {
                                htmls: [`
                                    <link href="_content/Material.Blazor/material.blazor.min.css" rel="stylesheet" />
                                    <link href="_content/Material.Blazor/material-components-web.min.css" rel="stylesheet" />
                                `],
                                insertAt: '@head-start',
                                enforce: 'post'
                            },
                            {
                                htmls: ['<link href="BlazorApp.Client.styles.css" rel="stylesheet" />'],
                                insertAt: '@head-end',
                                enforce: 'post'
                            },
                            {
                                htmls: [`
                                <script src="_content/Material.Blazor/material.blazor.min.js"></script>
                                <script>
                                    MaterialBlazor.MBTooltip.numbers.HIDE_DELAY_MS = 0
                                </script>
                                <script src="_content/Microsoft.AspNetCore.Components.WebAssembly.Authentication/AuthenticationService.js"></script>
                                <script src="_framework/blazor.webassembly.js"></script>
                                <script>navigator.serviceWorker.register("[SERVICEWORKER_PATH]", {type:"module"});</script>
                                `],
                                insertAt: '@body-end',
                                enforce: 'post'
                            },
                            // {
                            //     insertAt: '@head-start',
                            //     htmls: htmls,
                            // }
                        ]
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
                ],
                // empty: [
                //     {
                //         fromPath: BlazorAppPaths.Client.wwwroot.toAbsolutePath(),
                //     }
                // ]
            })
        ]
    }
}

