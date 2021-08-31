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
exports.WebpackMinimizersService = void 0;
const webpack_closure_plugin_service_1 = require("../webpack-closure-plugin/webpack-closure-plugin.service");
const webpack_css_minimizer_plugin_service_1 = require("../webpack-css-minimizer-plugin/webpack-css-minimizer-plugin.service");
const webpack_optimize_css_assets_plugin_service_1 = require("../webpack-optimize-css-assets-plugin/webpack-optimize-css-assets-plugin.service");
const webpack_terser_plugin_service_1 = require("../webpack-terser-plugin/webpack-terser-plugin.service");
const process_webpack_providers_1 = require("#shared/src/functions/process-webpack-providers");
const process_webpack_providers_2 = require("#shared/src/functions/process-webpack-providers");
let WebpackMinimizersService = class WebpackMinimizersService {
    createMinimizers() {
        const minimizers = [];
        minimizers.push(this.webpackTerserPluginService.createPlugin());
        minimizers.push(this.webpackOptimizeCssAssetsPluginService.createPlugin());
        minimizers.push(this.webpackCssMinimizerPluginService.createPlugin());
        // minimizers.push(this.webpackClosurePluginService.createPlugin());
        return minimizers;
    }
};
__decorate([
    process_webpack_providers_2.CustomInject(webpack_closure_plugin_service_1.WebpackClosureWebpackPluginService),
    __metadata("design:type", webpack_closure_plugin_service_1.WebpackClosureWebpackPluginService)
], WebpackMinimizersService.prototype, "webpackClosurePluginService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_css_minimizer_plugin_service_1.WebpackCssMinimizerPluginService),
    __metadata("design:type", webpack_css_minimizer_plugin_service_1.WebpackCssMinimizerPluginService)
], WebpackMinimizersService.prototype, "webpackCssMinimizerPluginService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_optimize_css_assets_plugin_service_1.WebpackOptimizeCssAssetsPluginService),
    __metadata("design:type", webpack_optimize_css_assets_plugin_service_1.WebpackOptimizeCssAssetsPluginService)
], WebpackMinimizersService.prototype, "webpackOptimizeCssAssetsPluginService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_terser_plugin_service_1.WebpackTerserPluginService),
    __metadata("design:type", webpack_terser_plugin_service_1.WebpackTerserPluginService)
], WebpackMinimizersService.prototype, "webpackTerserPluginService", void 0);
WebpackMinimizersService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], WebpackMinimizersService);
exports.WebpackMinimizersService = WebpackMinimizersService;
//# sourceMappingURL=webpack-minimizers.service.js.map