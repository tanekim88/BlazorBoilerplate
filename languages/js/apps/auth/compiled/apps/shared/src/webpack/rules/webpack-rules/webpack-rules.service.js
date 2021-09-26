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
exports.WebpackRulesService = exports.WebpackRulesConfigService = void 0;
const webpack_csv_rules_service_1 = require("../webpack-csv-rules/webpack-csv-rules.service");
const webpack_font_rules_service_1 = require("../webpack-font-rules/webpack-font-rules.service");
const webpack_image_rules_service_1 = require("../webpack-image-rules/webpack-image-rules.service");
const webpack_json_rules_service_1 = require("../webpack-json-rules/webpack-json-rules.service");
const webpack_style_rules_service_1 = require("../webpack-style-rules/webpack-style-rules.service");
const webpack_svg_rules_service_1 = require("../webpack-svg-rules/webpack-svg-rules.service");
const webpack_ts_rules_service_1 = require("../webpack-ts-rules/webpack-ts-rules.service");
const webpack_xml_rules_service_1 = require("../webpack-xml-rules/webpack-xml-rules.service");
const process_webpack_providers_1 = require("#shared/src/functions/process-webpack-providers");
const process_webpack_providers_2 = require("#shared/src/functions/process-webpack-providers");
let WebpackRulesConfigService = class WebpackRulesConfigService {
    createRules() {
        const toReturn = [
            ...this.webpackCsvRulesService.createRules(),
            ...this.webpackFontRulesService.createRules(),
            ...this.webpackImageRulesService.createRules(),
            ...this.webpackJsonRulesService.createRules(),
            ...this.webpackSvgRulesService.createRules(),
            ...this.webpackTsRulesService.createRules(),
            ...this.webpackXmlRulesService.createRules(),
        ];
        return toReturn;
    }
};
__decorate([
    process_webpack_providers_2.CustomInject(webpack_style_rules_service_1.WebpackStyleRulesService),
    __metadata("design:type", webpack_style_rules_service_1.WebpackStyleRulesService)
], WebpackRulesConfigService.prototype, "webpackStyleRulesService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_csv_rules_service_1.WebpackCsvRulesService),
    __metadata("design:type", webpack_csv_rules_service_1.WebpackCsvRulesService)
], WebpackRulesConfigService.prototype, "webpackCsvRulesService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_font_rules_service_1.WebpackFontRulesService),
    __metadata("design:type", webpack_font_rules_service_1.WebpackFontRulesService)
], WebpackRulesConfigService.prototype, "webpackFontRulesService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_image_rules_service_1.WebpackImageRulesService),
    __metadata("design:type", webpack_image_rules_service_1.WebpackImageRulesService)
], WebpackRulesConfigService.prototype, "webpackImageRulesService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_json_rules_service_1.WebpackJsonRulesService),
    __metadata("design:type", webpack_json_rules_service_1.WebpackJsonRulesService)
], WebpackRulesConfigService.prototype, "webpackJsonRulesService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_svg_rules_service_1.WebpackSvgRulesService),
    __metadata("design:type", webpack_svg_rules_service_1.WebpackSvgRulesService)
], WebpackRulesConfigService.prototype, "webpackSvgRulesService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_ts_rules_service_1.WebpackTsRulesService),
    __metadata("design:type", webpack_ts_rules_service_1.WebpackTsRulesService)
], WebpackRulesConfigService.prototype, "webpackTsRulesService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_xml_rules_service_1.WebpackXmlRulesService),
    __metadata("design:type", webpack_xml_rules_service_1.WebpackXmlRulesService)
], WebpackRulesConfigService.prototype, "webpackXmlRulesService", void 0);
WebpackRulesConfigService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], WebpackRulesConfigService);
exports.WebpackRulesConfigService = WebpackRulesConfigService;
let WebpackRulesService = class WebpackRulesService {
    createRules() {
        const toReturn = [
            ...this.webpackStyleRulesService.createRules(),
            ...this.webpackCsvRulesService.createRules(),
            ...this.webpackFontRulesService.createRules(),
            ...this.webpackImageRulesService.createRules(),
            ...this.webpackJsonRulesService.createRules(),
            ...this.webpackSvgRulesService.createRules(),
            ...this.webpackTsRulesService.createRules(),
            ...this.webpackXmlRulesService.createRules(),
        ];
        return toReturn;
    }
};
__decorate([
    process_webpack_providers_2.CustomInject(webpack_style_rules_service_1.WebpackStyleRulesService),
    __metadata("design:type", webpack_style_rules_service_1.WebpackStyleRulesService)
], WebpackRulesService.prototype, "webpackStyleRulesService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_csv_rules_service_1.WebpackCsvRulesService),
    __metadata("design:type", webpack_csv_rules_service_1.WebpackCsvRulesService)
], WebpackRulesService.prototype, "webpackCsvRulesService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_font_rules_service_1.WebpackFontRulesService),
    __metadata("design:type", webpack_font_rules_service_1.WebpackFontRulesService)
], WebpackRulesService.prototype, "webpackFontRulesService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_image_rules_service_1.WebpackImageRulesService),
    __metadata("design:type", webpack_image_rules_service_1.WebpackImageRulesService)
], WebpackRulesService.prototype, "webpackImageRulesService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_json_rules_service_1.WebpackJsonRulesService),
    __metadata("design:type", webpack_json_rules_service_1.WebpackJsonRulesService)
], WebpackRulesService.prototype, "webpackJsonRulesService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_svg_rules_service_1.WebpackSvgRulesService),
    __metadata("design:type", webpack_svg_rules_service_1.WebpackSvgRulesService)
], WebpackRulesService.prototype, "webpackSvgRulesService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_ts_rules_service_1.WebpackTsRulesService),
    __metadata("design:type", webpack_ts_rules_service_1.WebpackTsRulesService)
], WebpackRulesService.prototype, "webpackTsRulesService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_xml_rules_service_1.WebpackXmlRulesService),
    __metadata("design:type", webpack_xml_rules_service_1.WebpackXmlRulesService)
], WebpackRulesService.prototype, "webpackXmlRulesService", void 0);
WebpackRulesService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], WebpackRulesService);
exports.WebpackRulesService = WebpackRulesService;
//# sourceMappingURL=webpack-rules.service.js.map