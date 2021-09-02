import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { EnvironmentService } from '../../../modules/environment/environment/environment.service';
import { VitePluginGlobInputService } from '../vite-plugin-glob-input/vite-plugin-glob-input.service';
import { VitePluginHtmlService } from '../vite-plugin-html/vite-plugin-html.service';


@CustomInjectable()
export class VitePluginsService {
    @CustomInject(EnvironmentService)
    protected environmentService: EnvironmentService;

    @CustomInject(VitePluginGlobInputService)
    protected vitePluginGlobInputService: VitePluginGlobInputService;

    @CustomInject(VitePluginHtmlService)
    protected vitePluginHtmlService: VitePluginHtmlService;

    createManyPlugins() {
        let plugins = [];
        // plugins.push(this.vitePluginHtmlService.createPlugin());

        return plugins;
    }
}
