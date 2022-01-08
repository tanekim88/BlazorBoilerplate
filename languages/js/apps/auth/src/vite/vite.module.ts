
import { CustomModule } from "#shared/src/functions/process-providers";
import { ViteModule } from "#shared/src/vite/vite.module";
import { AuthModulesModule } from "../modules/modules.module";
import { AuthViteDevService } from "./vite-dev/vite-dev.service";
import { AuthVitePluginsModule } from "./vite-plugins/vite-plugins.module";
import { AuthViteProdService } from "./vite-prod/vite-prod.service";
import { AuthViteSharedService } from "./vite-shared/vite-shared.service";

@CustomModule({
    imports: [ViteModule, AuthModulesModule, AuthVitePluginsModule],
    providers: [
        AuthViteSharedService,
        AuthViteProdService,
        AuthViteDevService,
    ],
})
export class AuthViteModule { }
