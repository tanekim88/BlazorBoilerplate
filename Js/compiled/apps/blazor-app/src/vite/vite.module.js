var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomModule } from "@shared/src/functions/process-providers";
import { ViteModule } from "@shared/src/vite/vite.module";
import { BlazorAppViteDevService } from "./vite-dev/vite-dev.service";
import { BlazorAppViteProdService } from "./vite-prod/vite-prod.service";
import { BlazorAppViteSharedService } from "./vite-shared/vite-shared.service";
let BlazorAppViteModule = class BlazorAppViteModule {
};
BlazorAppViteModule = __decorate([
    CustomModule({
        imports: [ViteModule],
        providers: [
            BlazorAppViteProdService,
            BlazorAppViteDevService,
            BlazorAppViteSharedService
        ],
    })
], BlazorAppViteModule);
export { BlazorAppViteModule };
//# sourceMappingURL=vite.module.js.map