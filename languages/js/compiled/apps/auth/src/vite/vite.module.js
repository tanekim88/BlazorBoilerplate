var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomModule } from "#shared/src/functions/process-providers";
import { ViteModule } from "#shared/src/vite/vite.module";
import { AuthModulesModule } from "../modules/modules.module";
import { AuthViteDevService } from "./vite-dev/vite-dev.service";
import { AuthVitePluginsModule } from "./vite-plugins/vite-plugins.module";
import { AuthViteProdService } from "./vite-prod/vite-prod.service";
import { AuthViteSharedService } from "./vite-shared/vite-shared.service";
let AuthViteModule = class AuthViteModule {
};
AuthViteModule = __decorate([
    CustomModule({
        imports: [ViteModule, AuthModulesModule, AuthVitePluginsModule],
        providers: [
            AuthViteSharedService,
            AuthViteProdService,
            AuthViteDevService,
        ],
    })
], AuthViteModule);
export { AuthViteModule };
//# sourceMappingURL=vite.module.js.map