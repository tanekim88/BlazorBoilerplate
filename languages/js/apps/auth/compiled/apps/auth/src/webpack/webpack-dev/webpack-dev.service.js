"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWebpackDevService = exports.AuthWebpackDevConfigService = void 0;
const process_webpack_providers_1 = require("@projects/shared/src/functions/process-webpack-providers");
const process_webpack_providers_2 = require("@projects/shared/src/functions/process-webpack-providers");
const webpack_dev_service_1 = require("@projects/shared/src/webpack/webpack-dev/webpack-dev.service");
const webpack_shared_config_service_1 = require("../webpack-shared-config/webpack-shared-config.service");
const webpack_shared_service_1 = require("../webpack-shared/webpack-shared.service");
let AuthWebpackDevBaseService = class AuthWebpackDevBaseService extends webpack_dev_service_1.WebpackDevService {
    createConfiguration(options) {
        return this.mergeService.mergeOptions(super.createConfiguration(), {}, options);
    }
};
AuthWebpackDevBaseService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], AuthWebpackDevBaseService);
class AuthWebpackDevConfigService extends AuthWebpackDevBaseService {
    createConfiguration(options) {
        return this.mergeService.mergeOptions(this.authWebpackSharedConfigService.createConfiguration(), super.createConfiguration(), {}, options);
    }
}
__decorate([
    process_webpack_providers_2.CustomInject(webpack_shared_config_service_1.AuthWebpackSharedConfigService),
    __metadata("design:type", webpack_shared_config_service_1.AuthWebpackSharedConfigService)
], AuthWebpackDevConfigService.prototype, "authWebpackSharedConfigService", void 0);
exports.AuthWebpackDevConfigService = AuthWebpackDevConfigService;
class AuthWebpackDevService extends AuthWebpackDevBaseService {
    createConfiguration(options) {
        return this.mergeService.mergeOptions(this.authWebpackSharedService.createConfiguration(), super.createConfiguration(), {}, options);
    }
}
__decorate([
    process_webpack_providers_2.CustomInject(webpack_shared_service_1.AuthWebpackSharedService),
    __metadata("design:type", webpack_shared_service_1.AuthWebpackSharedService)
], AuthWebpackDevService.prototype, "authWebpackSharedService", void 0);
exports.AuthWebpackDevService = AuthWebpackDevService;
//# sourceMappingURL=webpack-dev.service.js.map