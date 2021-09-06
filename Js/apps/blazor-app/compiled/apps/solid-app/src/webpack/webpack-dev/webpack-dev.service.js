var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CustomInjectable } from '#shared/src/functions/process-providers';
import { CustomInject } from '#shared/src/functions/process-providers';
import { WebpackDevService } from '#shared/src/webpack/webpack-dev/webpack-dev.service';
import { SolidAppWebpackSharedConfigService } from '../webpack-shared-config/webpack-shared-config.service';
import { SolidAppWebpackSharedService } from '../webpack-shared/webpack-shared.service';
let SolidAppWebpackDevBaseService = class SolidAppWebpackDevBaseService extends WebpackDevService {
    createConfiguration(options) {
        return this.mergeService.mergeOptions(super.createConfiguration(), {}, options);
    }
};
SolidAppWebpackDevBaseService = __decorate([
    CustomInjectable()
], SolidAppWebpackDevBaseService);
export class SolidAppWebpackDevConfigService extends SolidAppWebpackDevBaseService {
    blazorAppClientWebpackSharedConfigService;
    createConfiguration(options) {
        return this.mergeService.mergeOptions(this.blazorAppClientWebpackSharedConfigService.createConfiguration(), super.createConfiguration(), {}, options);
    }
}
__decorate([
    CustomInject(SolidAppWebpackSharedConfigService),
    __metadata("design:type", SolidAppWebpackSharedConfigService)
], SolidAppWebpackDevConfigService.prototype, "blazorAppClientWebpackSharedConfigService", void 0);
export class SolidAppWebpackDevService extends SolidAppWebpackDevBaseService {
    blazorAppClientWebpackSharedService;
    createConfiguration(options) {
        return this.mergeService.mergeOptions(this.blazorAppClientWebpackSharedService.createConfiguration(), super.createConfiguration(), {}, options);
    }
}
__decorate([
    CustomInject(SolidAppWebpackSharedService),
    __metadata("design:type", SolidAppWebpackSharedService)
], SolidAppWebpackDevService.prototype, "blazorAppClientWebpackSharedService", void 0);
//# sourceMappingURL=webpack-dev.service.js.map