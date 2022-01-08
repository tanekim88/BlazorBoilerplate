var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomModule } from "#shared/src/functions/process-providers";
import { ViteModule } from "#shared/src/vite/vite.module";
import { ReactAppModulesModule } from "../modules/modules.module";
import { ReactAppViteDevService } from "./vite-dev/vite-dev.service";
import { ReactAppVitePluginsModule } from "./vite-plugins/vite-plugins.module";
import { ReactAppViteProdService } from "./vite-prod/vite-prod.service";
import { ReactAppViteSharedService } from "./vite-shared/vite-shared.service";
let ReactAppViteModule = class ReactAppViteModule {
};
ReactAppViteModule = __decorate([
    CustomModule({
        imports: [ViteModule, ReactAppModulesModule, ReactAppVitePluginsModule],
        providers: [
            ReactAppViteSharedService,
            ReactAppViteProdService,
            ReactAppViteDevService,
        ],
    })
], ReactAppViteModule);
export { ReactAppViteModule };
//# sourceMappingURL=vite.module.js.map