import { CustomModule } from "#shared/src/functions/process-providers";
import { ReactAppVitePluginsService } from "./vite-plugins.service";


@CustomModule({
    imports: [],
    providers: [
        ReactAppVitePluginsService
    ],
})
export class ReactAppVitePluginsModule {}
