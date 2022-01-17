import { AngularAppEnvironmentService } from '#angular-app/src/modules/environment/environment/environment.service';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';

import { VitePluginsService } from '#shared/src/vite/vite-plugins/vite-plugins/vite-plugins.service';
import solidPlugin from 'vite-plugin-solid';
@CustomInjectable()
export class AngularAppVitePluginsService extends VitePluginsService {
    @CustomInject(AngularAppEnvironmentService)
    angularAppEnvironmentService: AngularAppEnvironmentService

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
                        include: [this.angularAppEnvironmentService.localPaths.src.web['index.html'].toAbsolutePath()],
                        relativeTo: this.angularAppEnvironmentService.localPaths.src.web.toAbsolutePath(),
                    }
                ]
            })
        ]
    }

}
