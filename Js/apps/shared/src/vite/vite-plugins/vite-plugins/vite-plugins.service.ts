import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { EnvironmentService } from '../../../modules/environment/environment/environment.service';
import { VitePluginGlobInputService } from '../vite-plugin-glob-input/vite-plugin-glob-input.service';


@CustomInjectable()
export class VitePluginsService {
    // @CustomInject(EnvironmentService)
    // protected environmentService: EnvironmentService;

    // @CustomInject(VitePluginGlobInputService)
    // protected vitePluginGlobInputService: VitePluginGlobInputService;

    createManyPlugins() {
        let plugins = [];
        // prePlugins.push(this.webpackWebpackWatchFilesPluginService.createPlugin());
        // plugins.push(this.vitePluginGlobInputService.createPlugin());

        return plugins;
    }
}
