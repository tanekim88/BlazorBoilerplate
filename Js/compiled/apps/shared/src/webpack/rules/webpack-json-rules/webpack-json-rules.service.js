"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackJsonRulesService = void 0;
const webpack_rules_base_service_1 = require("../webpack-rules-base/webpack-rules-base.service");
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
let WebpackJsonRulesService = class WebpackJsonRulesService extends webpack_rules_base_service_1.WebpackRulesBaseService {
    createRule(options) {
        return this.mergeService.mergeOptions(super.createRule(), {
            test: /\.json5$/i,
            loader: 'json5-loader',
            options: {
                esModule: false,
            },
            type: 'javascript/auto',
        }, options);
    }
    createRules() {
        return [...super.createRules(), this.createRule()];
    }
};
WebpackJsonRulesService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], WebpackJsonRulesService);
exports.WebpackJsonRulesService = WebpackJsonRulesService;
//# sourceMappingURL=webpack-json-rules.service.js.map