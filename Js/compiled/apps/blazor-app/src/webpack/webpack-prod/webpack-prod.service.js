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
exports.BlazorAppWebpackProdService = exports.BlazorAppWebpackProdConfigService = void 0;
const webpack_prod_service_1 = require("@shared/src/webpack/webpack-prod/webpack-prod.service");
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
const process_webpack_providers_2 = require("@shared/src/functions/process-webpack-providers");
const webpack_shared_config_service_1 = require("../webpack-shared-config/webpack-shared-config.service");
const webpack_shared_service_1 = require("../webpack-shared/webpack-shared.service");
let BlazorAppWebpackProdBaseService = class BlazorAppWebpackProdBaseService extends webpack_prod_service_1.WebpackProdService {
    createConfiguration(options) {
        return this.mergeService.mergeOptions(super.createConfiguration(), {}, options);
    }
};
BlazorAppWebpackProdBaseService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], BlazorAppWebpackProdBaseService);
class BlazorAppWebpackProdConfigService extends BlazorAppWebpackProdBaseService {
    createConfiguration(options) {
        return this.mergeService.mergeOptions(this.blazorAppClientWebpackSharedConfigService.createConfiguration(), super.createConfiguration(), {}, options);
    }
}
__decorate([
    process_webpack_providers_2.CustomInject(webpack_shared_config_service_1.BlazorAppWebpackSharedConfigService),
    __metadata("design:type", webpack_shared_config_service_1.BlazorAppWebpackSharedConfigService)
], BlazorAppWebpackProdConfigService.prototype, "blazorAppClientWebpackSharedConfigService", void 0);
exports.BlazorAppWebpackProdConfigService = BlazorAppWebpackProdConfigService;
class BlazorAppWebpackProdService extends BlazorAppWebpackProdBaseService {
    createConfiguration(options) {
        return this.mergeService.mergeOptions(this.blazorAppClientWebpackSharedService.createConfiguration(), super.createConfiguration(), {}, options);
    }
}
__decorate([
    process_webpack_providers_2.CustomInject(webpack_shared_service_1.BlazorAppWebpackSharedService),
    __metadata("design:type", webpack_shared_service_1.BlazorAppWebpackSharedService)
], BlazorAppWebpackProdService.prototype, "blazorAppClientWebpackSharedService", void 0);
exports.BlazorAppWebpackProdService = BlazorAppWebpackProdService;
//# sourceMappingURL=webpack-prod.service.js.map