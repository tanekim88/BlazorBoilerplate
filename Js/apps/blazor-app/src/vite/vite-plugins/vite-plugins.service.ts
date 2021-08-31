import { CustomInjectable } from '#shared/src/functions/process-providers';
import { VitePluginsService } from '#shared/src/vite/vite-plugins/vite-plugins/vite-plugins.service';

@CustomInjectable()
export class BlazorAppVitePluginsService extends VitePluginsService {}
