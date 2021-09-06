var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
import { EnvironmentService } from '../../../modules/environment/environment/environment.service';
import { WebpackCleanWebpackPluginService } from '../webpack-clean-webpack-plugin/webpack-clean-webpack-plugin.service';
import { WebpackCopyWebpackPluginService } from '../webpack-copy-webpack-plugin/webpack-copy-webpack-plugin.service';
import { WebpackFaviconsWebpackPluginService } from '../webpack-favicons-webpack-plugin/webpack-favicons-webpack-plugin.service';
import { WebpackMiniCssExtractPluginService, WebpackMiniCssExtractPluginConfigService, } from '../webpack-mini-css-extract-plugin/webpack-mini-css-extract-plugin.service';
import { WebpackRemoveFilesWebpackPluginService, WebpackPreRemoveFilesWebpackPluginService, } from '../webpack-remove-files-webpack-plugin/webpack-remove-files-webpack-plugin.service';
import { WebpackWebpackFixStyleOnlyEntriesService } from '../webpack-webpack-fix-style-only-entries/webpack-webpack-fix-style-only-entries.service';
import { WebpackWorkboxWebpackPluginService } from '../webpack-workbox-webpack-plugin/webpack-workbox-webpack-plugin.service';
import { WebpackTsconfigPathsWebpackPluginService } from '../webpack-tsconfig-paths-webpack-plugin/webpack-tsconfig-paths-webpack-plugin.service';
import { WebpackWebpackChokidarPluginService } from '../webpack-webpack-chokidar-plugin/webpack-webpack-chokidar-plugin.service';
import { WebpackWatchEntriesPluginConfigService, WebpackWatchEntriesPluginService, } from '../webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';
import { WebpackErrorOverlayWebpackPluginService } from '../webpack-error-overlay-webpack-plugin/webpack-error-overlay-webpack-plugin.service';
import { WebpackHtmlWebpackPluginService } from '../webpack-html-webpack-plugin/webpack-html-webpack-plugin.service';
import { WebpackHtmlWebpackCustomizerPluginService } from '../webpack-html-webpack-customizer-plugin/webpack-html-webpack-customizer-plugin.service';
import { WebpackProfilingPluginService } from '../webpack-profiling-plugin/webpack-profiling-plugin.service';
import { WebpackWebpackBundleAnalyzerService } from '../webpack-webpack-bundle-analyzer/webpack-webpack-bundle-analyzer.service';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { WebpackProvidePluginService } from '../webpack-provide-plugin/webpack-provide-plugin.service';
import { WebpackSvgSpriteMapWebpackPluginService } from '../webpack-svg-spritemap-webpack-plugin/webpack-svg-spritemap-webpack-plugin.service';
let WebpackPluginsConfigService = class WebpackPluginsConfigService {
    environmentService;
    webpackCopyWebpackPluginService;
    // @CustomInject(WebpackExtractSvgSpriteWebpackPluginService)
    // protected webpackExtractSvgSpriteWebpackPluginService: WebpackExtractSvgSpriteWebpackPluginService;
    webpackFaviconsWebpackPluginService;
    webpackHtmlWebpackPluginService;
    webpackPreMiniCssExtractPluginService;
    webpackPreRemoveFilesWebpackPluginService;
    // @CustomInject(WebpackSvgSpriteLoaderPluginService)
    // protected webpackSvgSpriteLoaderPluginService: WebpackSvgSpriteLoaderPluginService;
    webpackWebpackFixStyleOnlyEntriesService;
    webpackWorkboxWebpackPluginService;
    webpackTsconfigPathsWebpackPluginService;
    webpackWebpackChokidarPluginService;
    webpackWatchEntriesPluginConfigService;
    webpackErrorOverlayWebpackPluginService;
    webpackProfilingPluginService;
    webpackWebpackBundleAnalyzerService;
    /**
     *
     */
    createPlugins() {
        const plugins = [];
        // prePlugins.push(this.webpackProfilingPluginService.createPlugin());
        // prePlugins.push(this.webpackWebpackWatchFilesPluginService.createPlugin());
        // prePlugins.push(this.webpackPreCleanWebpackPluginService.createPlugin());
        // prePlugins.push(this.webpackCopyWebpackPluginService.createPlugin())
        // prePlugins.push(this.webpackExtractSvgSpriteWebpackPluginService.createPlugin())
        // prePlugins.push(this.webpackFaviconsWebpackPluginService.createPlugin())
        // prePlugins.push(this.webpackMiniCssExtractPluginService.createPlugin())
        // prePlugins.push(this.webpackWorkboxWebpackPluginService.createPlugin())
        // prePlugins.push(this.webpackWebpackFixStyleOnlyEntriesService.createPlugin());
        // prePlugins.push(this.webpackPreRemoveFilesWebpackPluginService.createPlugin());
        plugins.push(this.webpackWatchEntriesPluginConfigService.createPlugin());
        // prePlugins.push(this.webpackErrorOverlayWebpackPluginService.createPlugin());
        // prePlugins.push(this.webpackWebpackChokidarPluginService.createPlugin());
        return plugins;
    }
};
__decorate([
    CustomInject(EnvironmentService),
    __metadata("design:type", EnvironmentService)
], WebpackPluginsConfigService.prototype, "environmentService", void 0);
__decorate([
    CustomInject(WebpackCopyWebpackPluginService),
    __metadata("design:type", typeof (_a = typeof WebpackCopyWebpackPluginService !== "undefined" && WebpackCopyWebpackPluginService) === "function" ? _a : Object)
], WebpackPluginsConfigService.prototype, "webpackCopyWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackFaviconsWebpackPluginService),
    __metadata("design:type", typeof (_b = typeof WebpackFaviconsWebpackPluginService !== "undefined" && WebpackFaviconsWebpackPluginService) === "function" ? _b : Object)
], WebpackPluginsConfigService.prototype, "webpackFaviconsWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackHtmlWebpackPluginService),
    __metadata("design:type", typeof (_c = typeof WebpackHtmlWebpackPluginService !== "undefined" && WebpackHtmlWebpackPluginService) === "function" ? _c : Object)
], WebpackPluginsConfigService.prototype, "webpackHtmlWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackMiniCssExtractPluginConfigService),
    __metadata("design:type", typeof (_d = typeof WebpackMiniCssExtractPluginConfigService !== "undefined" && WebpackMiniCssExtractPluginConfigService) === "function" ? _d : Object)
], WebpackPluginsConfigService.prototype, "webpackPreMiniCssExtractPluginService", void 0);
__decorate([
    CustomInject(WebpackPreRemoveFilesWebpackPluginService),
    __metadata("design:type", typeof (_e = typeof WebpackPreRemoveFilesWebpackPluginService !== "undefined" && WebpackPreRemoveFilesWebpackPluginService) === "function" ? _e : Object)
], WebpackPluginsConfigService.prototype, "webpackPreRemoveFilesWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackWebpackFixStyleOnlyEntriesService),
    __metadata("design:type", typeof (_f = typeof WebpackWebpackFixStyleOnlyEntriesService !== "undefined" && WebpackWebpackFixStyleOnlyEntriesService) === "function" ? _f : Object)
], WebpackPluginsConfigService.prototype, "webpackWebpackFixStyleOnlyEntriesService", void 0);
__decorate([
    CustomInject(WebpackWorkboxWebpackPluginService),
    __metadata("design:type", typeof (_g = typeof WebpackWorkboxWebpackPluginService !== "undefined" && WebpackWorkboxWebpackPluginService) === "function" ? _g : Object)
], WebpackPluginsConfigService.prototype, "webpackWorkboxWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackTsconfigPathsWebpackPluginService),
    __metadata("design:type", typeof (_h = typeof WebpackTsconfigPathsWebpackPluginService !== "undefined" && WebpackTsconfigPathsWebpackPluginService) === "function" ? _h : Object)
], WebpackPluginsConfigService.prototype, "webpackTsconfigPathsWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackWebpackChokidarPluginService),
    __metadata("design:type", typeof (_j = typeof WebpackWebpackChokidarPluginService !== "undefined" && WebpackWebpackChokidarPluginService) === "function" ? _j : Object)
], WebpackPluginsConfigService.prototype, "webpackWebpackChokidarPluginService", void 0);
__decorate([
    CustomInject(WebpackWatchEntriesPluginConfigService),
    __metadata("design:type", typeof (_k = typeof WebpackWatchEntriesPluginConfigService !== "undefined" && WebpackWatchEntriesPluginConfigService) === "function" ? _k : Object)
], WebpackPluginsConfigService.prototype, "webpackWatchEntriesPluginConfigService", void 0);
__decorate([
    CustomInject(WebpackErrorOverlayWebpackPluginService),
    __metadata("design:type", typeof (_l = typeof WebpackErrorOverlayWebpackPluginService !== "undefined" && WebpackErrorOverlayWebpackPluginService) === "function" ? _l : Object)
], WebpackPluginsConfigService.prototype, "webpackErrorOverlayWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackProfilingPluginService),
    __metadata("design:type", typeof (_m = typeof WebpackProfilingPluginService !== "undefined" && WebpackProfilingPluginService) === "function" ? _m : Object)
], WebpackPluginsConfigService.prototype, "webpackProfilingPluginService", void 0);
__decorate([
    CustomInject(WebpackWebpackBundleAnalyzerService),
    __metadata("design:type", typeof (_o = typeof WebpackWebpackBundleAnalyzerService !== "undefined" && WebpackWebpackBundleAnalyzerService) === "function" ? _o : Object)
], WebpackPluginsConfigService.prototype, "webpackWebpackBundleAnalyzerService", void 0);
WebpackPluginsConfigService = __decorate([
    CustomInjectable()
], WebpackPluginsConfigService);
export { WebpackPluginsConfigService };
let WebpackPluginsService = class WebpackPluginsService {
    wnvironmentService;
    webpackCleanWebpackPluginService;
    webpackCopyWebpackPluginService;
    // @CustomInject(WebpackExtractSvgSpriteWebpackPluginService)
    // protected webpackExtractSvgSpriteWebpackPluginService: WebpackExtractSvgSpriteWebpackPluginService;
    webpackFaviconsWebpackPluginService;
    webpackHtmlWebpackPluginService;
    webpackMiniCssExtractPluginService;
    webpackRemoveFilesWebpackPluginService;
    // @CustomInject(WebpackSvgSpriteLoaderPluginService)
    // protected webpackSvgSpriteLoaderPluginService: WebpackSvgSpriteLoaderPluginService;
    webpackWebpackFixStyleOnlyEntriesService;
    webpackWorkboxWebpackPluginService;
    webpackTsconfigPathsWebpackPluginService;
    webpackWebpackChokidarPluginService;
    webpackWatchEntriesPluginService;
    webpackErrorOverlayWebpackPluginService;
    webpackHtmlWebpackCustomizerPluginService;
    webpackProfilingPluginService;
    webpackWebpackBundleAnalyzerService;
    webpackProvidePluginService;
    webpackSvgSpriteMapWebpackPluginService;
    /**
     *
     */
    createPlugins() {
        let plugins = [];
        // prePlugins.push(this.webpackWebpackWatchFilesPluginService.createPlugin());
        plugins.push(this.webpackCleanWebpackPluginService.createPlugin());
        plugins.push(this.webpackProvidePluginService.createPlugin());
        plugins.push(this.webpackWatchEntriesPluginService.createPlugin());
        plugins.push(this.webpackCopyWebpackPluginService.createPlugin());
        // prePlugins.push(this.webpackExtractSvgSpriteWebpackPluginService.createPlugin())
        // html-webpack-plugin must come before favicons-webpack-plugin in the plugins array.
        plugins.push(this.webpackHtmlWebpackCustomizerPluginService.createPlugin());
        plugins = plugins.concat(this.webpackHtmlWebpackPluginService.createManyPlugins());
        plugins.push(this.webpackFaviconsWebpackPluginService.createPlugin());
        plugins.push(this.webpackMiniCssExtractPluginService.createPlugin());
        plugins.push(this.webpackWorkboxWebpackPluginService.createPlugin());
        plugins.push(this.webpackWebpackFixStyleOnlyEntriesService.createPlugin());
        // plugins.push(this.webpackSvgSpriteMapWebpackPluginService.createPlugin());
        // plugins.push(this.webpackRemoveFilesWebpackPluginService.createPlugin());
        // plugins.push(this.webpackErrorOverlayWebpackPluginService.createPlugin());
        // plugins.push(this.webpackWebpackBundleAnalyzerService.createPlugin());
        // plugins.push(this.webpackProfilingPluginService.createPlugin());
        // prePlugins.push(this.webpackWebpackChokidarPluginService.createPlugin());
        return plugins;
    }
};
__decorate([
    CustomInject(EnvironmentService),
    __metadata("design:type", EnvironmentService)
], WebpackPluginsService.prototype, "wnvironmentService", void 0);
__decorate([
    CustomInject(WebpackCleanWebpackPluginService),
    __metadata("design:type", typeof (_p = typeof WebpackCleanWebpackPluginService !== "undefined" && WebpackCleanWebpackPluginService) === "function" ? _p : Object)
], WebpackPluginsService.prototype, "webpackCleanWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackCopyWebpackPluginService),
    __metadata("design:type", typeof (_q = typeof WebpackCopyWebpackPluginService !== "undefined" && WebpackCopyWebpackPluginService) === "function" ? _q : Object)
], WebpackPluginsService.prototype, "webpackCopyWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackFaviconsWebpackPluginService),
    __metadata("design:type", typeof (_r = typeof WebpackFaviconsWebpackPluginService !== "undefined" && WebpackFaviconsWebpackPluginService) === "function" ? _r : Object)
], WebpackPluginsService.prototype, "webpackFaviconsWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackHtmlWebpackPluginService),
    __metadata("design:type", typeof (_s = typeof WebpackHtmlWebpackPluginService !== "undefined" && WebpackHtmlWebpackPluginService) === "function" ? _s : Object)
], WebpackPluginsService.prototype, "webpackHtmlWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackMiniCssExtractPluginService),
    __metadata("design:type", typeof (_t = typeof WebpackMiniCssExtractPluginService !== "undefined" && WebpackMiniCssExtractPluginService) === "function" ? _t : Object)
], WebpackPluginsService.prototype, "webpackMiniCssExtractPluginService", void 0);
__decorate([
    CustomInject(WebpackRemoveFilesWebpackPluginService),
    __metadata("design:type", typeof (_u = typeof WebpackRemoveFilesWebpackPluginService !== "undefined" && WebpackRemoveFilesWebpackPluginService) === "function" ? _u : Object)
], WebpackPluginsService.prototype, "webpackRemoveFilesWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackWebpackFixStyleOnlyEntriesService),
    __metadata("design:type", typeof (_v = typeof WebpackWebpackFixStyleOnlyEntriesService !== "undefined" && WebpackWebpackFixStyleOnlyEntriesService) === "function" ? _v : Object)
], WebpackPluginsService.prototype, "webpackWebpackFixStyleOnlyEntriesService", void 0);
__decorate([
    CustomInject(WebpackWorkboxWebpackPluginService),
    __metadata("design:type", typeof (_w = typeof WebpackWorkboxWebpackPluginService !== "undefined" && WebpackWorkboxWebpackPluginService) === "function" ? _w : Object)
], WebpackPluginsService.prototype, "webpackWorkboxWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackTsconfigPathsWebpackPluginService),
    __metadata("design:type", typeof (_x = typeof WebpackTsconfigPathsWebpackPluginService !== "undefined" && WebpackTsconfigPathsWebpackPluginService) === "function" ? _x : Object)
], WebpackPluginsService.prototype, "webpackTsconfigPathsWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackWebpackChokidarPluginService),
    __metadata("design:type", typeof (_y = typeof WebpackWebpackChokidarPluginService !== "undefined" && WebpackWebpackChokidarPluginService) === "function" ? _y : Object)
], WebpackPluginsService.prototype, "webpackWebpackChokidarPluginService", void 0);
__decorate([
    CustomInject(WebpackWatchEntriesPluginService),
    __metadata("design:type", typeof (_z = typeof WebpackWatchEntriesPluginService !== "undefined" && WebpackWatchEntriesPluginService) === "function" ? _z : Object)
], WebpackPluginsService.prototype, "webpackWatchEntriesPluginService", void 0);
__decorate([
    CustomInject(WebpackErrorOverlayWebpackPluginService),
    __metadata("design:type", typeof (_0 = typeof WebpackErrorOverlayWebpackPluginService !== "undefined" && WebpackErrorOverlayWebpackPluginService) === "function" ? _0 : Object)
], WebpackPluginsService.prototype, "webpackErrorOverlayWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackHtmlWebpackCustomizerPluginService),
    __metadata("design:type", typeof (_1 = typeof WebpackHtmlWebpackCustomizerPluginService !== "undefined" && WebpackHtmlWebpackCustomizerPluginService) === "function" ? _1 : Object)
], WebpackPluginsService.prototype, "webpackHtmlWebpackCustomizerPluginService", void 0);
__decorate([
    CustomInject(WebpackProfilingPluginService),
    __metadata("design:type", typeof (_2 = typeof WebpackProfilingPluginService !== "undefined" && WebpackProfilingPluginService) === "function" ? _2 : Object)
], WebpackPluginsService.prototype, "webpackProfilingPluginService", void 0);
__decorate([
    CustomInject(WebpackWebpackBundleAnalyzerService),
    __metadata("design:type", typeof (_3 = typeof WebpackWebpackBundleAnalyzerService !== "undefined" && WebpackWebpackBundleAnalyzerService) === "function" ? _3 : Object)
], WebpackPluginsService.prototype, "webpackWebpackBundleAnalyzerService", void 0);
__decorate([
    CustomInject(WebpackProvidePluginService),
    __metadata("design:type", typeof (_4 = typeof WebpackProvidePluginService !== "undefined" && WebpackProvidePluginService) === "function" ? _4 : Object)
], WebpackPluginsService.prototype, "webpackProvidePluginService", void 0);
__decorate([
    CustomInject(WebpackSvgSpriteMapWebpackPluginService),
    __metadata("design:type", typeof (_5 = typeof WebpackSvgSpriteMapWebpackPluginService !== "undefined" && WebpackSvgSpriteMapWebpackPluginService) === "function" ? _5 : Object)
], WebpackPluginsService.prototype, "webpackSvgSpriteMapWebpackPluginService", void 0);
WebpackPluginsService = __decorate([
    CustomInjectable()
], WebpackPluginsService);
export { WebpackPluginsService };
//# sourceMappingURL=plugins.service.js.map