"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWebpackXmlRulesService = void 0;
const webpack_xml_rules_service_1 = require("@shared/src/webpack/rules/webpack-xml-rules/webpack-xml-rules.service");
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
let AuthWebpackXmlRulesService = class AuthWebpackXmlRulesService extends webpack_xml_rules_service_1.WebpackXmlRulesService {
    createRule(options) {
        return this.mergeService.mergeOptions(super.createRule(), {}, options);
    }
};
AuthWebpackXmlRulesService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], AuthWebpackXmlRulesService);
exports.AuthWebpackXmlRulesService = AuthWebpackXmlRulesService;
//# sourceMappingURL=webpack-xml-rules.service.js.map