var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { ViteDevService } from '#shared/src/vite/vite-dev/vite-dev.service';
import { ReactAppViteSharedService } from '../vite-shared/vite-shared.service';
let ReactAppViteDevService = class ReactAppViteDevService extends ViteDevService {
    reactAppViteSharedService;
    createConfiguration(options) {
        return this.mergeService.mergeOptions(super.createConfiguration(), this.reactAppViteSharedService.createConfiguration(), {
            build: {
                minify: false
            }
        }, options);
    }
};
__decorate([
    CustomInject(ReactAppViteSharedService),
    __metadata("design:type", ReactAppViteSharedService)
], ReactAppViteDevService.prototype, "reactAppViteSharedService", void 0);
ReactAppViteDevService = __decorate([
    CustomInjectable()
], ReactAppViteDevService);
export { ReactAppViteDevService };
//# sourceMappingURL=vite-dev.service.js.map