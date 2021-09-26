var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
import { WebpackClosureWebpackPluginService } from '../webpack-closure-plugin/webpack-closure-plugin.service';
import { WebpackCssMinimizerPluginService } from '../webpack-css-minimizer-plugin/webpack-css-minimizer-plugin.service';
import { WebpackOptimizeCssAssetsPluginService } from '../webpack-optimize-css-assets-plugin/webpack-optimize-css-assets-plugin.service';
import { WebpackTerserPluginService } from '../webpack-terser-plugin/webpack-terser-plugin.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';
import { CustomInject } from '#shared/src/functions/process-providers';
let WebpackMinimizersService = class WebpackMinimizersService {
    webpackClosurePluginService;
    webpackCssMinimizerPluginService;
    webpackOptimizeCssAssetsPluginService;
    webpackTerserPluginService;
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
    CustomInject(WebpackClosureWebpackPluginService),
    __metadata("design:type", typeof (_a = typeof WebpackClosureWebpackPluginService !== "undefined" && WebpackClosureWebpackPluginService) === "function" ? _a : Object)
], WebpackMinimizersService.prototype, "webpackClosurePluginService", void 0);
__decorate([
    CustomInject(WebpackCssMinimizerPluginService),
    __metadata("design:type", typeof (_b = typeof WebpackCssMinimizerPluginService !== "undefined" && WebpackCssMinimizerPluginService) === "function" ? _b : Object)
], WebpackMinimizersService.prototype, "webpackCssMinimizerPluginService", void 0);
__decorate([
    CustomInject(WebpackOptimizeCssAssetsPluginService),
    __metadata("design:type", typeof (_c = typeof WebpackOptimizeCssAssetsPluginService !== "undefined" && WebpackOptimizeCssAssetsPluginService) === "function" ? _c : Object)
], WebpackMinimizersService.prototype, "webpackOptimizeCssAssetsPluginService", void 0);
__decorate([
    CustomInject(WebpackTerserPluginService),
    __metadata("design:type", typeof (_d = typeof WebpackTerserPluginService !== "undefined" && WebpackTerserPluginService) === "function" ? _d : Object)
], WebpackMinimizersService.prototype, "webpackTerserPluginService", void 0);
WebpackMinimizersService = __decorate([
    CustomInjectable()
], WebpackMinimizersService);
export { WebpackMinimizersService };
//# sourceMappingURL=minimizers.service.js.map