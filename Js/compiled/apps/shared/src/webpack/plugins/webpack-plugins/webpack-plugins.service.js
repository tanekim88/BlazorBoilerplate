var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    __metadata("design:type", WebpackCopyWebpackPluginService)
], WebpackPluginsConfigService.prototype, "webpackCopyWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackFaviconsWebpackPluginService),
    __metadata("design:type", WebpackFaviconsWebpackPluginService)
], WebpackPluginsConfigService.prototype, "webpackFaviconsWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackHtmlWebpackPluginService),
    __metadata("design:type", WebpackHtmlWebpackPluginService)
], WebpackPluginsConfigService.prototype, "webpackHtmlWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackMiniCssExtractPluginConfigService),
    __metadata("design:type", WebpackMiniCssExtractPluginConfigService)
], WebpackPluginsConfigService.prototype, "webpackPreMiniCssExtractPluginService", void 0);
__decorate([
    CustomInject(WebpackPreRemoveFilesWebpackPluginService),
    __metadata("design:type", WebpackPreRemoveFilesWebpackPluginService)
], WebpackPluginsConfigService.prototype, "webpackPreRemoveFilesWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackWebpackFixStyleOnlyEntriesService),
    __metadata("design:type", WebpackWebpackFixStyleOnlyEntriesService)
], WebpackPluginsConfigService.prototype, "webpackWebpackFixStyleOnlyEntriesService", void 0);
__decorate([
    CustomInject(WebpackWorkboxWebpackPluginService),
    __metadata("design:type", WebpackWorkboxWebpackPluginService)
], WebpackPluginsConfigService.prototype, "webpackWorkboxWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackTsconfigPathsWebpackPluginService),
    __metadata("design:type", WebpackTsconfigPathsWebpackPluginService)
], WebpackPluginsConfigService.prototype, "webpackTsconfigPathsWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackWebpackChokidarPluginService),
    __metadata("design:type", WebpackWebpackChokidarPluginService)
], WebpackPluginsConfigService.prototype, "webpackWebpackChokidarPluginService", void 0);
__decorate([
    CustomInject(WebpackWatchEntriesPluginConfigService),
    __metadata("design:type", WebpackWatchEntriesPluginConfigService)
], WebpackPluginsConfigService.prototype, "webpackWatchEntriesPluginConfigService", void 0);
__decorate([
    CustomInject(WebpackErrorOverlayWebpackPluginService),
    __metadata("design:type", WebpackErrorOverlayWebpackPluginService)
], WebpackPluginsConfigService.prototype, "webpackErrorOverlayWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackProfilingPluginService),
    __metadata("design:type", WebpackProfilingPluginService)
], WebpackPluginsConfigService.prototype, "webpackProfilingPluginService", void 0);
__decorate([
    CustomInject(WebpackWebpackBundleAnalyzerService),
    __metadata("design:type", WebpackWebpackBundleAnalyzerService)
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
    __metadata("design:type", WebpackCleanWebpackPluginService)
], WebpackPluginsService.prototype, "webpackCleanWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackCopyWebpackPluginService),
    __metadata("design:type", WebpackCopyWebpackPluginService)
], WebpackPluginsService.prototype, "webpackCopyWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackFaviconsWebpackPluginService),
    __metadata("design:type", WebpackFaviconsWebpackPluginService)
], WebpackPluginsService.prototype, "webpackFaviconsWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackHtmlWebpackPluginService),
    __metadata("design:type", WebpackHtmlWebpackPluginService)
], WebpackPluginsService.prototype, "webpackHtmlWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackMiniCssExtractPluginService),
    __metadata("design:type", WebpackMiniCssExtractPluginService)
], WebpackPluginsService.prototype, "webpackMiniCssExtractPluginService", void 0);
__decorate([
    CustomInject(WebpackRemoveFilesWebpackPluginService),
    __metadata("design:type", WebpackRemoveFilesWebpackPluginService)
], WebpackPluginsService.prototype, "webpackRemoveFilesWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackWebpackFixStyleOnlyEntriesService),
    __metadata("design:type", WebpackWebpackFixStyleOnlyEntriesService)
], WebpackPluginsService.prototype, "webpackWebpackFixStyleOnlyEntriesService", void 0);
__decorate([
    CustomInject(WebpackWorkboxWebpackPluginService),
    __metadata("design:type", WebpackWorkboxWebpackPluginService)
], WebpackPluginsService.prototype, "webpackWorkboxWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackTsconfigPathsWebpackPluginService),
    __metadata("design:type", WebpackTsconfigPathsWebpackPluginService)
], WebpackPluginsService.prototype, "webpackTsconfigPathsWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackWebpackChokidarPluginService),
    __metadata("design:type", WebpackWebpackChokidarPluginService)
], WebpackPluginsService.prototype, "webpackWebpackChokidarPluginService", void 0);
__decorate([
    CustomInject(WebpackWatchEntriesPluginService),
    __metadata("design:type", WebpackWatchEntriesPluginService)
], WebpackPluginsService.prototype, "webpackWatchEntriesPluginService", void 0);
__decorate([
    CustomInject(WebpackErrorOverlayWebpackPluginService),
    __metadata("design:type", WebpackErrorOverlayWebpackPluginService)
], WebpackPluginsService.prototype, "webpackErrorOverlayWebpackPluginService", void 0);
__decorate([
    CustomInject(WebpackHtmlWebpackCustomizerPluginService),
    __metadata("design:type", WebpackHtmlWebpackCustomizerPluginService)
], WebpackPluginsService.prototype, "webpackHtmlWebpackCustomizerPluginService", void 0);
__decorate([
    CustomInject(WebpackProfilingPluginService),
    __metadata("design:type", WebpackProfilingPluginService)
], WebpackPluginsService.prototype, "webpackProfilingPluginService", void 0);
__decorate([
    CustomInject(WebpackWebpackBundleAnalyzerService),
    __metadata("design:type", WebpackWebpackBundleAnalyzerService)
], WebpackPluginsService.prototype, "webpackWebpackBundleAnalyzerService", void 0);
__decorate([
    CustomInject(WebpackProvidePluginService),
    __metadata("design:type", WebpackProvidePluginService)
], WebpackPluginsService.prototype, "webpackProvidePluginService", void 0);
__decorate([
    CustomInject(WebpackSvgSpriteMapWebpackPluginService),
    __metadata("design:type", WebpackSvgSpriteMapWebpackPluginService)
], WebpackPluginsService.prototype, "webpackSvgSpriteMapWebpackPluginService", void 0);
WebpackPluginsService = __decorate([
    CustomInjectable()
], WebpackPluginsService);
export { WebpackPluginsService };
//# sourceMappingURL=webpack-plugins.service.js.map