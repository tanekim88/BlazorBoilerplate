
import { CustomModule } from "#shared/src/functions/process-providers";
import { ViteModule } from "#shared/src/vite/vite.module";
import { BlazorAppViteDevService } from "./vite-dev/vite-dev.service";
import { BlazorAppViteProdService } from "./vite-prod/vite-prod.service";
import { BlazorAppViteSharedService } from "./vite-shared/vite-shared.service";

@CustomModule({
    imports: [ViteModule],
    providers: [
        BlazorAppViteProdService,
        BlazorAppViteDevService,
        BlazorAppViteSharedService
    ],
})
export class BlazorAppViteModule {}
