import { CustomModule } from "../functions/process-providers";
import { ModulesModule } from "../modules/modules.module";
import { VitePluginsService } from "./plugins/vite-plugins/vite-plugins.service";
import { ViteBaseService } from "./vite-base/vite-base.service";
import { ViteDevService } from "./vite-dev/vite-dev.service";
import { ViteProdService } from "./vite-prod/vite-prod.service";
import { ViteSharedService } from "./vite-shared/vite-shared.service";

@CustomModule({
    imports: [ModulesModule],
    providers: [
        ViteProdService,
        ViteDevService,
        ViteSharedService,
        ViteBaseService,
        VitePluginsService
    ],
})
export class ViteModule {}
