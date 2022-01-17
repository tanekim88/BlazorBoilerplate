import { CustomModule } from "#shared/src/functions/process-providers";
import { AngularAppVitePluginsService } from "./vite-plugins.service";


@CustomModule({
    imports: [],
    providers: [
        AngularAppVitePluginsService
    ],
})
export class AngularAppVitePluginsModule {}
