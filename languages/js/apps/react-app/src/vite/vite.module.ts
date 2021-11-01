
import { CustomModule } from "#shared/src/functions/process-providers";
import { ViteModule } from "#shared/src/vite/vite.module";
import { ReactAppModulesModule } from "../modules/modules.module";
import { ReactAppViteDevService } from "./vite-dev/vite-dev.service";
import { ReactAppVitePluginsModule } from "./vite-plugins/vite-plugins.module";
import { ReactAppViteProdService } from "./vite-prod/vite-prod.service";
import { ReactAppViteSharedService } from "./vite-shared/vite-shared.service";

@CustomModule({
    imports: [ViteModule, ReactAppModulesModule, ReactAppVitePluginsModule],
    providers: [
        ReactAppViteSharedService,
        ReactAppViteProdService,
        ReactAppViteDevService,
    ],
})
export class ReactAppViteModule { }
