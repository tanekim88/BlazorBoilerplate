
import { CustomModule } from "@projects/shared/src/functions/process-providers";
import { ViteModule } from "@projects/shared/src/vite/vite.module";
import { BlazorAppModulesModule } from "../modules/modules.module";
import { BlazorAppViteDevService } from "./vite-dev/vite-dev.service";
import { BlazorAppVitePluginsModule } from "./vite-plugins/vite-plugins.module";
import { BlazorAppViteProdService } from "./vite-prod/vite-prod.service";
import { BlazorAppViteSharedService } from "./vite-shared/vite-shared.service";

@CustomModule({
    imports: [ViteModule, BlazorAppModulesModule, BlazorAppVitePluginsModule],
    providers: [
        BlazorAppViteSharedService,
        BlazorAppViteProdService,
        BlazorAppViteDevService,
    ],
})
export class BlazorAppViteModule { }
