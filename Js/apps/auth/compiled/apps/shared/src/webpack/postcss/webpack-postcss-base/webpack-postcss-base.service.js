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
exports.WebpackPostcssBaseService = void 0;
const merge_service_1 = require("../../../modules/utilities/merge/merge/merge.service");
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
const process_webpack_providers_2 = require("@shared/src/functions/process-webpack-providers");
const environment_service_1 = require("@shared/src/modules/environment/environment/environment.service");
let WebpackPostcssBaseService = class WebpackPostcssBaseService {
    constructor(ConstructorClass) {
        this.ConstructorClass = ConstructorClass;
    }
    createOptions(options) {
        return this.mergeService.mergeOptions({}, options);
    }
    createPlugin(options) {
        return this.ConstructorClass(this.createOptions(options));
    }
};
__decorate([
    process_webpack_providers_2.CustomInject(merge_service_1.MergeService),
    __metadata("design:type", merge_service_1.MergeService)
], WebpackPostcssBaseService.prototype, "mergeService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(environment_service_1.EnvironmentService),
    __metadata("design:type", environment_service_1.EnvironmentService)
], WebpackPostcssBaseService.prototype, "environmentService", void 0);
WebpackPostcssBaseService = __decorate([
    process_webpack_providers_1.CustomInjectable(),
    __metadata("design:paramtypes", [Object])
], WebpackPostcssBaseService);
exports.WebpackPostcssBaseService = WebpackPostcssBaseService;
//# sourceMappingURL=webpack-postcss-base.service.js.map