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
exports.WebpackRulesBaseService = void 0;
const merge_service_1 = require("../../../modules/utilities/merge/merge/merge.service");
const process_webpack_providers_1 = require("#shared/src/functions/process-webpack-providers");
const process_webpack_providers_2 = require("#shared/src/functions/process-webpack-providers");
const environment_service_1 = require("#shared/src/modules/environment/environment/environment.service");
const regex_service_1 = require("#shared/src/modules/utilities/regex/regex/regex.service");
let WebpackRulesBaseService = class WebpackRulesBaseService {
    createRules(options) {
        const toReturn = options ?? [];
        return toReturn.map((x) => {
            return this.createRule(x);
        });
    }
    createRule(options) {
        return this.mergeService.mergeOptions({}, options);
    }
};
__decorate([
    process_webpack_providers_2.CustomInject(merge_service_1.MergeService),
    __metadata("design:type", merge_service_1.MergeService)
], WebpackRulesBaseService.prototype, "mergeService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(regex_service_1.RegexService),
    __metadata("design:type", regex_service_1.RegexService)
], WebpackRulesBaseService.prototype, "regexService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(environment_service_1.EnvironmentService),
    __metadata("design:type", environment_service_1.EnvironmentService)
], WebpackRulesBaseService.prototype, "environmentService", void 0);
WebpackRulesBaseService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], WebpackRulesBaseService);
exports.WebpackRulesBaseService = WebpackRulesBaseService;
//# sourceMappingURL=webpack-rules-base.service.js.map