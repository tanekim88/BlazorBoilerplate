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
exports.BlazorAppWebpackDevService = exports.BlazorAppWebpackDevConfigService = void 0;
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
const process_webpack_providers_2 = require("@shared/src/functions/process-webpack-providers");
const webpack_dev_service_1 = require("@shared/src/webpack/webpack-dev/webpack-dev.service");
const webpack_shared_config_service_1 = require("../webpack-shared-config/webpack-shared-config.service");
const webpack_shared_service_1 = require("../webpack-shared/webpack-shared.service");
let BlazorAppWebpackDevBaseService = class BlazorAppWebpackDevBaseService extends webpack_dev_service_1.WebpackDevService {
    createConfiguration(options) {
        return this.mergeService.mergeOptions(super.createConfiguration(), {}, options);
    }
};
BlazorAppWebpackDevBaseService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], BlazorAppWebpackDevBaseService);
class BlazorAppWebpackDevConfigService extends BlazorAppWebpackDevBaseService {
    createConfiguration(options) {
        return this.mergeService.mergeOptions(this.blazorAppClientWebpackSharedConfigService.createConfiguration(), super.createConfiguration(), {}, options);
    }
}
__decorate([
    process_webpack_providers_2.CustomInject(webpack_shared_config_service_1.BlazorAppWebpackSharedConfigService),
    __metadata("design:type", webpack_shared_config_service_1.BlazorAppWebpackSharedConfigService)
], BlazorAppWebpackDevConfigService.prototype, "blazorAppClientWebpackSharedConfigService", void 0);
exports.BlazorAppWebpackDevConfigService = BlazorAppWebpackDevConfigService;
class BlazorAppWebpackDevService extends BlazorAppWebpackDevBaseService {
    createConfiguration(options) {
        return this.mergeService.mergeOptions(this.blazorAppClientWebpackSharedService.createConfiguration(), super.createConfiguration(), {}, options);
    }
}
__decorate([
    process_webpack_providers_2.CustomInject(webpack_shared_service_1.BlazorAppWebpackSharedService),
    __metadata("design:type", webpack_shared_service_1.BlazorAppWebpackSharedService)
], BlazorAppWebpackDevService.prototype, "blazorAppClientWebpackSharedService", void 0);
exports.BlazorAppWebpackDevService = BlazorAppWebpackDevService;
//# sourceMappingURL=webpack-dev.service.js.map