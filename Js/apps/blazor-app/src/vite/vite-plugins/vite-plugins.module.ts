import { CustomModule } from "#shared/src/functions/process-providers";
import { BlazorAppVitePluginsService } from "./vite-plugins.service";


@CustomModule({
    imports: [],
    providers: [
        BlazorAppVitePluginsService
    ],
})
export class BlazorAppVitePluginsModule {}
