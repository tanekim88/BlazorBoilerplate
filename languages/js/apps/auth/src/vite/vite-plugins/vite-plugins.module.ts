import { CustomModule } from "#shared/src/functions/process-providers";
import { AuthVitePluginsService } from "./vite-plugins.service";


@CustomModule({
    imports: [],
    providers: [
        AuthVitePluginsService
    ],
})
export class AuthVitePluginsModule {}
