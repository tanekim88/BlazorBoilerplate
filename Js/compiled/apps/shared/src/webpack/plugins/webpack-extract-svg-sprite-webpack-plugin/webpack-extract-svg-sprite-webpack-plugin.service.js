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
exports.WebpackExtractSvgSpriteWebpackPluginService = void 0;
const webpack_plugin_base_service_1 = require("../webpack-plugin-base/webpack-plugin-base.service");
const ExtractSvgSpriteWebpackPlugin = require('extract-svg-sprite-webpack-plugin');
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
let WebpackExtractSvgSpriteWebpackPluginService = class WebpackExtractSvgSpriteWebpackPluginService extends webpack_plugin_base_service_1.WebpackPluginBaseService {
    constructor() {
        super(ExtractSvgSpriteWebpackPlugin);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
};
WebpackExtractSvgSpriteWebpackPluginService = __decorate([
    process_webpack_providers_1.CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackExtractSvgSpriteWebpackPluginService);
exports.WebpackExtractSvgSpriteWebpackPluginService = WebpackExtractSvgSpriteWebpackPluginService;
//# sourceMappingURL=webpack-extract-svg-sprite-webpack-plugin.service.js.map