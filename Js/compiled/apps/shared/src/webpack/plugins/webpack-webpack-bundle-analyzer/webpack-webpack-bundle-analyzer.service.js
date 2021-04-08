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
exports.WebpackWebpackBundleAnalyzerService = void 0;
const webpack_plugin_base_service_1 = require("../webpack-plugin-base/webpack-plugin-base.service");
const webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
let WebpackWebpackBundleAnalyzerService = class WebpackWebpackBundleAnalyzerService extends webpack_plugin_base_service_1.WebpackPluginBaseService {
    constructor() {
        super(webpack_bundle_analyzer_1.BundleAnalyzerPlugin);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 8889,
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            statsFilename: 'stats.json',
        }, options);
    }
};
WebpackWebpackBundleAnalyzerService = __decorate([
    process_webpack_providers_1.CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackWebpackBundleAnalyzerService);
exports.WebpackWebpackBundleAnalyzerService = WebpackWebpackBundleAnalyzerService;
//# sourceMappingURL=webpack-webpack-bundle-analyzer.service.js.map