var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ViteBaseService } from '../Vite-base/Vite-base.service';
import { CustomInject, CustomInjectable } from '@shared/src/functions/process-providers';
import { ViteSharedService } from '../vite-shared/vite-shared.service';
let ViteProdService = class ViteProdService extends ViteBaseService {
    viteSharedService;
    createConfiguration(options) {
        return this.mergeService.mergeOptions(super.createConfiguration(), this.viteSharedService.createConfiguration(), {
            mode: 'production'
        }, options);
    }
    createManyConfigurations() {
        return [];
    }
};
__decorate([
    CustomInject(ViteSharedService),
    __metadata("design:type", ViteSharedService)
], ViteProdService.prototype, "viteSharedService", void 0);
ViteProdService = __decorate([
    CustomInjectable()
], ViteProdService);
export { ViteProdService };
//# sourceMappingURL=vite-prod.service.js.map