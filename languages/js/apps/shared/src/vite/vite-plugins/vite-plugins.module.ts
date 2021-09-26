import { CustomModule } from "@projects/shared/src/functions/process-providers";
import { VitePluginGlobInputService } from "./services/vite-plugin-glob-input/vite-plugin-glob-input.service";
import { VitePluginHtmlService } from "./services/vite-plugin-html/vite-plugin-html.service";
import { VitePluginsService } from "./vite-plugins/vite-plugins.service";


@CustomModule({
    imports: [],
    providers: [
        VitePluginGlobInputService,
        VitePluginHtmlService,
        VitePluginsService
    ],
})
export class VitePluginsModule {}
