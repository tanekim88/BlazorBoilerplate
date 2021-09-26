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
import { AuthWebpackSharedConfigService } from '../webpack-shared-config/webpack-shared-config.service';
import { AuthWebpackSharedService } from '../webpack-shared/webpack-shared.service';
let AuthWebpackDevBaseService = class AuthWebpackDevBaseService extends WebpackDevService {
    createConfiguration(options) {
        return this.mergeService.mergeOptions(super.createConfiguration(), {}, options);
    }
};
AuthWebpackDevBaseService = __decorate([
    CustomInjectable()
], AuthWebpackDevBaseService);
export class AuthWebpackDevConfigService extends AuthWebpackDevBaseService {
    authWebpackSharedConfigService;
    createConfiguration(options) {
        return this.mergeService.mergeOptions(this.authWebpackSharedConfigService.createConfiguration(), super.createConfiguration(), {}, options);
    }
}
__decorate([
    CustomInject(AuthWebpackSharedConfigService),
    __metadata("design:type", AuthWebpackSharedConfigService)
], AuthWebpackDevConfigService.prototype, "authWebpackSharedConfigService", void 0);
export class AuthWebpackDevService extends AuthWebpackDevBaseService {
    authWebpackSharedService;
    createConfiguration(options) {
        return this.mergeService.mergeOptions(this.authWebpackSharedService.createConfiguration(), super.createConfiguration(), {}, options);
    }
}
__decorate([
    CustomInject(AuthWebpackSharedService),
    __metadata("design:type", AuthWebpackSharedService)
], AuthWebpackDevService.prototype, "authWebpackSharedService", void 0);
//# sourceMappingURL=webpack-dev.service.js.map