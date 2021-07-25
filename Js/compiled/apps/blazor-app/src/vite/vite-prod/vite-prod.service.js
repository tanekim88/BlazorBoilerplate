var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CustomInject, CustomInjectable } from '@shared/src/functions/process-providers';
import { ViteProdService } from '@shared/src/vite/vite-prod/vite-prod.service';
import { BlazorAppViteSharedService } from '../vite-shared/vite-shared.service';
let BlazorAppViteProdService = class BlazorAppViteProdService extends ViteProdService {
    createConfiguration(options) {
        return this.mergeService.mergeOptions(super.createConfiguration(), this.blazorAppClientViteSharedService.createConfiguration(), {}, options);
    }
};
__decorate([
    CustomInject(BlazorAppViteSharedService),
    __metadata("design:type", BlazorAppViteSharedService)
], BlazorAppViteProdService.prototype, "blazorAppClientViteSharedService", void 0);
BlazorAppViteProdService = __decorate([
    CustomInjectable()
], BlazorAppViteProdService);
export { BlazorAppViteProdService };
//# sourceMappingURL=vite-prod.service.js.map