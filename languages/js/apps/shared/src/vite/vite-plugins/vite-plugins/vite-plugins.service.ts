import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { EnvironmentService } from '../../../modules/environment/environment/environment.service';
import { VitePluginGlobInputService } from '../services/vite-plugin-glob-input/vite-plugin-glob-input.service';

@CustomInjectable()
export class VitePluginsService {
    @CustomInject(EnvironmentService)
    protected environmentService: EnvironmentService;

    @CustomInject(VitePluginGlobInputService)
    protected vitePluginGlobInputService: VitePluginGlobInputService;


    createManyPlugins() {
        let plugins = [];
        // plugins.push(this.vitePluginHtmlService.createPlugin());

        return plugins;
    }
}
