import { SolidAppEnvironmentService } from '@projects/solid-app/src/modules/environment/environment/environment.service';
import { CustomInject, CustomInjectable } from '@projects/shared/src/functions/process-providers';

import { VitePluginsService } from '@projects/shared/src/vite/vite-plugins/vite-plugins/vite-plugins.service';

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
            this.vitePluginHtmlService.createPlugin({
                externals: [

                ]
            }),
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
