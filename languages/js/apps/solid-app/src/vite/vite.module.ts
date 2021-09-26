
import { CustomModule } from "#shared/src/functions/process-providers";
import { ViteModule } from "#shared/src/vite/vite.module";
import { SolidAppModulesModule } from "../modules/modules.module";
import { SolidAppViteDevService } from "./vite-dev/vite-dev.service";
import { SolidAppVitePluginsModule } from "./vite-plugins/vite-plugins.module";
import { SolidAppViteProdService } from "./vite-prod/vite-prod.service";
import { SolidAppViteSharedService } from "./vite-shared/vite-shared.service";

@CustomModule({
    imports: [ViteModule, SolidAppModulesModule, SolidAppVitePluginsModule],
    providers: [
        SolidAppViteSharedService,
        SolidAppViteProdService,
        SolidAppViteDevService,
    ],
})
export class SolidAppViteModule { }
