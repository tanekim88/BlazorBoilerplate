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
import { SolidAppViteSharedService } from '../vite-shared/vite-shared.service';
let SolidAppViteDevService = class SolidAppViteDevService extends ViteDevService {
    solidAppViteSharedService;
    createConfiguration(options) {
        return this.mergeService.mergeOptions(super.createConfiguration(), this.solidAppViteSharedService.createConfiguration(), {
            build: {
                minify: false
            }
        }, options);
    }
};
__decorate([
    CustomInject(SolidAppViteSharedService),
    __metadata("design:type", SolidAppViteSharedService)
], SolidAppViteDevService.prototype, "solidAppViteSharedService", void 0);
SolidAppViteDevService = __decorate([
    CustomInjectable()
], SolidAppViteDevService);
export { SolidAppViteDevService };
//# sourceMappingURL=vite-dev.service.js.map