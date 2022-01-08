import { SolidAppEnvironmentService } from '#solid-app/src/modules/environment/environment/environment.service';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';

import { VitePluginsService } from '#shared/src/vite/vite-plugins/vite-plugins/vite-plugins.service';
import solidPlugin from 'vite-plugin-solid';
@CustomInjectable()
export class SolidAppVitePluginsService extends VitePluginsService {
    @CustomInject(SolidAppEnvironmentService)
    solidAppEnvironmentService: SolidAppEnvironmentService

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
                        include: [this.solidAppEnvironmentService.localPaths.src.templates['index.html'].toAbsolutePath()],
                        relativeTo: this.solidAppEnvironmentService.localPaths.src.templates.toAbsolutePath(),
                    }
                ]
            })
        ]
    }

}
