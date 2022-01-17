
import { CustomModule } from "#shared/src/functions/process-providers";
import { ViteModule } from "#shared/src/vite/vite.module";
import { AngularAppModulesModule } from "../modules/modules.module";
import { AngularAppViteDevService } from "./vite-dev/vite-dev.service";
import { AngularAppVitePluginsModule } from "./vite-plugins/vite-plugins.module";
import { AngularAppViteProdService } from "./vite-prod/vite-prod.service";
import { AngularAppViteSharedService } from "./vite-shared/vite-shared.service";

@CustomModule({
    imports: [ViteModule, AngularAppModulesModule, AngularAppVitePluginsModule],
    providers: [
        AngularAppViteSharedService,
        AngularAppViteProdService,
        AngularAppViteDevService,
    ],
})
export class AngularAppViteModule { }
