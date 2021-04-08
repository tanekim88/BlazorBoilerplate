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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlazorAppWebpackMiniCssExtractPluginService = exports.BlazorAppWebpackMiniCssExtractPluginConfigService = void 0;
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const webpack_mini_css_extract_plugin_service_1 = require("@shared/src/webpack/plugins/webpack-mini-css-extract-plugin/webpack-mini-css-extract-plugin.service");
let BlazorAppWebpackMiniCssExtractPluginConfigService = class BlazorAppWebpackMiniCssExtractPluginConfigService extends webpack_mini_css_extract_plugin_service_1.WebpackMiniCssExtractPluginConfigService {
    /**
     *
     */
    constructor() {
        super(mini_css_extract_plugin_1.default);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
};
BlazorAppWebpackMiniCssExtractPluginConfigService = __decorate([
    process_webpack_providers_1.CustomInjectable(),
    __metadata("design:paramtypes", [])
], BlazorAppWebpackMiniCssExtractPluginConfigService);
exports.BlazorAppWebpackMiniCssExtractPluginConfigService = BlazorAppWebpackMiniCssExtractPluginConfigService;
let BlazorAppWebpackMiniCssExtractPluginService = class BlazorAppWebpackMiniCssExtractPluginService extends webpack_mini_css_extract_plugin_service_1.WebpackMiniCssExtractPluginService {
    /**
     *
     */
    constructor() {
        super(mini_css_extract_plugin_1.default);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
};
BlazorAppWebpackMiniCssExtractPluginService = __decorate([
    process_webpack_providers_1.CustomInjectable(),
    __metadata("design:paramtypes", [])
], BlazorAppWebpackMiniCssExtractPluginService);
exports.BlazorAppWebpackMiniCssExtractPluginService = BlazorAppWebpackMiniCssExtractPluginService;
//# sourceMappingURL=webpack-mini-css-extract-plugin.service.js.map