import { CustomModule } from "#shared/src/functions/process-providers";
import { VitePluginGlobInputService } from "./services/vite-plugin-glob-input/vite-plugin-glob-input.service";
import { VitePluginsService } from "./vite-plugins/vite-plugins.service";


@CustomModule({
    imports: [],
    providers: [
        VitePluginGlobInputService,
        VitePluginsService
    ],
})
export class VitePluginsModule {}
