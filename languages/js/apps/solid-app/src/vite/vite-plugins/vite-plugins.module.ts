import { CustomModule } from "@projects/shared/src/functions/process-providers";
import { SolidAppVitePluginsService } from "./vite-plugins.service";


@CustomModule({
    imports: [],
    providers: [
        SolidAppVitePluginsService
    ],
})
export class SolidAppVitePluginsModule {}
