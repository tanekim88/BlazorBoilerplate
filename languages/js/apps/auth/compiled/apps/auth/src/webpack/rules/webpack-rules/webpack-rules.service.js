"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWebpackRulesService = exports.AuthWebpackRulesConfigService = void 0;
const webpack_rules_service_1 = require("@projects/shared/src/webpack/rules/webpack-rules/webpack-rules.service");
const process_webpack_providers_1 = require("@projects/shared/src/functions/process-webpack-providers");
let AuthWebpackRulesConfigService = class AuthWebpackRulesConfigService extends webpack_rules_service_1.WebpackRulesConfigService {
};
AuthWebpackRulesConfigService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], AuthWebpackRulesConfigService);
exports.AuthWebpackRulesConfigService = AuthWebpackRulesConfigService;
let AuthWebpackRulesService = class AuthWebpackRulesService extends webpack_rules_service_1.WebpackRulesService {
};
AuthWebpackRulesService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], AuthWebpackRulesService);
exports.AuthWebpackRulesService = AuthWebpackRulesService;
//# sourceMappingURL=webpack-rules.service.js.map