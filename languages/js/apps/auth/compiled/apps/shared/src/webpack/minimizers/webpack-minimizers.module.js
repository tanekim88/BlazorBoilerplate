"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackMinimizersModule = void 0;
const webpack_closure_plugin_service_1 = require("./webpack-closure-plugin/webpack-closure-plugin.service");
const webpack_css_minimizer_plugin_service_1 = require("./webpack-css-minimizer-plugin/webpack-css-minimizer-plugin.service");
const webpack_optimize_css_assets_plugin_service_1 = require("./webpack-optimize-css-assets-plugin/webpack-optimize-css-assets-plugin.service");
const webpack_terser_plugin_service_1 = require("./webpack-terser-plugin/webpack-terser-plugin.service");
const webpack_minimizers_service_1 = require("./webpack-minimizers/webpack-minimizers.service");
const process_webpack_providers_1 = require("../../functions/process-webpack-providers");
let WebpackMinimizersModule = class WebpackMinimizersModule {
};
WebpackMinimizersModule = __decorate([
    process_webpack_providers_1.CustomModule({
        providers: [
            webpack_minimizers_service_1.WebpackMinimizersService,
            webpack_closure_plugin_service_1.WebpackClosureWebpackPluginService,
            webpack_css_minimizer_plugin_service_1.WebpackCssMinimizerPluginService,
            webpack_optimize_css_assets_plugin_service_1.WebpackOptimizeCssAssetsPluginService,
            webpack_terser_plugin_service_1.WebpackTerserPluginService,
        ],
    })
], WebpackMinimizersModule);
exports.WebpackMinimizersModule = WebpackMinimizersModule;
//# sourceMappingURL=webpack-minimizers.module.js.map