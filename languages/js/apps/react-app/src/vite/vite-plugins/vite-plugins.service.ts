import { ReactAppEnvironmentService } from '#react-app/src/modules/environment/environment/environment.service';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';

import { VitePluginsService } from '#shared/src/vite/vite-plugins/vite-plugins/vite-plugins.service';

@CustomInjectable()
export class ReactAppVitePluginsService extends VitePluginsService {
    @CustomInject(ReactAppEnvironmentService)
    reactAppEnvironmentService: ReactAppEnvironmentService

    // @CustomInject(VitePluginGlobInputService)
    // protected vitePluginGlobInputService: VitePluginGlobInputService;

    // @CustomInject(VitePluginHtmlService)
    // protected vitePluginHtmlService: VitePluginHtmlService;
    createManyPlugins() {

        return [
            this.vitePluginGlobInputService.createPlugin({
                inputs: [
                    {
                        include: [this.reactAppEnvironmentService.localPaths.src.templates['index.html'].toAbsolutePath()],
                        relativeTo: this.reactAppEnvironmentService.localPaths.src.templates.toAbsolutePath(),
                    }
                ]
            })
        ]
    }

}
