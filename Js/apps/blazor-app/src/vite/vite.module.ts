
import { CustomModule } from "#shared/src/functions/process-providers";
import { ViteModule } from "#shared/src/vite/vite.module";
import { BlazorAppModulesModule } from "../modules/modules.module";
import { BlazorAppViteDevService } from "./vite-dev/vite-dev.service";
import { BlazorAppViteProdService } from "./vite-prod/vite-prod.service";
import { BlazorAppViteSharedService } from "./vite-shared/vite-shared.service";

@CustomModule({
    imports: [ViteModule, BlazorAppModulesModule],
    providers: [
        BlazorAppViteSharedService,
        BlazorAppViteProdService,
        BlazorAppViteDevService,
    ],
})
export class BlazorAppViteModule { }
