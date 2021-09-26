"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackRulesModule = void 0;
const webpack_csv_rules_service_1 = require("./webpack-csv-rules/webpack-csv-rules.service");
const webpack_font_rules_service_1 = require("./webpack-font-rules/webpack-font-rules.service");
const webpack_image_rules_service_1 = require("./webpack-image-rules/webpack-image-rules.service");
const webpack_json_rules_service_1 = require("./webpack-json-rules/webpack-json-rules.service");
const webpack_style_rules_service_1 = require("./webpack-style-rules/webpack-style-rules.service");
const webpack_svg_rules_service_1 = require("./webpack-svg-rules/webpack-svg-rules.service");
const webpack_ts_rules_service_1 = require("./webpack-ts-rules/webpack-ts-rules.service");
const webpack_xml_rules_service_1 = require("./webpack-xml-rules/webpack-xml-rules.service");
const webpack_rules_service_1 = require("./webpack-rules/webpack-rules.service");
const process_webpack_providers_1 = require("../../functions/process-webpack-providers");
const webpack_rules_base_service_1 = require("./webpack-rules-base/webpack-rules-base.service");
let WebpackRulesModule = class WebpackRulesModule {
};
WebpackRulesModule = __decorate([
    process_webpack_providers_1.CustomModule({
        providers: [
            webpack_rules_service_1.WebpackRulesConfigService,
            webpack_rules_service_1.WebpackRulesService,
            webpack_rules_base_service_1.WebpackRulesBaseService,
            webpack_csv_rules_service_1.WebpackCsvRulesService,
            webpack_font_rules_service_1.WebpackFontRulesService,
            webpack_image_rules_service_1.WebpackImageRulesService,
            webpack_json_rules_service_1.WebpackJsonRulesService,
            webpack_style_rules_service_1.WebpackStyleRulesService,
            webpack_svg_rules_service_1.WebpackSvgRulesService,
            webpack_ts_rules_service_1.WebpackTsRulesService,
            webpack_xml_rules_service_1.WebpackXmlRulesService,
        ],
        imports: [],
    })
], WebpackRulesModule);
exports.WebpackRulesModule = WebpackRulesModule;
//# sourceMappingURL=webpack-rules.module.js.map