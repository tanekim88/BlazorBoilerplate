"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWebpackJsonRulesService = void 0;
const webpack_json_rules_service_1 = require("@projects/shared/src/webpack/rules/webpack-json-rules/webpack-json-rules.service");
const process_webpack_providers_1 = require("@projects/shared/src/functions/process-webpack-providers");
let AuthWebpackJsonRulesService = class AuthWebpackJsonRulesService extends webpack_json_rules_service_1.WebpackJsonRulesService {
    createRule(options) {
        return this.mergeService.mergeOptions(super.createRule(), {}, options);
    }
};
AuthWebpackJsonRulesService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], AuthWebpackJsonRulesService);
exports.AuthWebpackJsonRulesService = AuthWebpackJsonRulesService;
//# sourceMappingURL=webpack-json-rules.service.js.map