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
exports.WebpackPluginsService = exports.WebpackPluginsConfigService = void 0;
const environment_service_1 = require("../../../modules/environment/environment/environment.service");
const webpack_clean_webpack_plugin_service_1 = require("../webpack-clean-webpack-plugin/webpack-clean-webpack-plugin.service");
const webpack_copy_webpack_plugin_service_1 = require("../webpack-copy-webpack-plugin/webpack-copy-webpack-plugin.service");
const webpack_favicons_webpack_plugin_service_1 = require("../webpack-favicons-webpack-plugin/webpack-favicons-webpack-plugin.service");
const webpack_mini_css_extract_plugin_service_1 = require("../webpack-mini-css-extract-plugin/webpack-mini-css-extract-plugin.service");
const webpack_remove_files_webpack_plugin_service_1 = require("../webpack-remove-files-webpack-plugin/webpack-remove-files-webpack-plugin.service");
const webpack_webpack_fix_style_only_entries_service_1 = require("../webpack-webpack-fix-style-only-entries/webpack-webpack-fix-style-only-entries.service");
const webpack_workbox_webpack_plugin_service_1 = require("../webpack-workbox-webpack-plugin/webpack-workbox-webpack-plugin.service");
const webpack_tsconfig_paths_webpack_plugin_service_1 = require("../webpack-tsconfig-paths-webpack-plugin/webpack-tsconfig-paths-webpack-plugin.service");
const webpack_webpack_chokidar_plugin_service_1 = require("../webpack-webpack-chokidar-plugin/webpack-webpack-chokidar-plugin.service");
const webpack_watch_entries_plugin_service_1 = require("../webpack-watch-entries-plugin/webpack-watch-entries-plugin.service");
const webpack_error_overlay_webpack_plugin_service_1 = require("../webpack-error-overlay-webpack-plugin/webpack-error-overlay-webpack-plugin.service");
const webpack_html_webpack_plugin_service_1 = require("../webpack-html-webpack-plugin/webpack-html-webpack-plugin.service");
const webpack_html_webpack_customizer_plugin_service_1 = require("../webpack-html-webpack-customizer-plugin/webpack-html-webpack-customizer-plugin.service");
const webpack_profiling_plugin_service_1 = require("../webpack-profiling-plugin/webpack-profiling-plugin.service");
const webpack_webpack_bundle_analyzer_service_1 = require("../webpack-webpack-bundle-analyzer/webpack-webpack-bundle-analyzer.service");
const process_webpack_providers_1 = require("#shared/src/functions/process-webpack-providers");
const webpack_provide_plugin_service_1 = require("../webpack-provide-plugin/webpack-provide-plugin.service");
const webpack_svg_spritemap_webpack_plugin_service_1 = require("../webpack-svg-spritemap-webpack-plugin/webpack-svg-spritemap-webpack-plugin.service");
let WebpackPluginsConfigService = class WebpackPluginsConfigService {
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
    process_webpack_providers_1.CustomInject(environment_service_1.EnvironmentService),
    __metadata("design:type", environment_service_1.EnvironmentService)
], WebpackPluginsConfigService.prototype, "environmentService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_copy_webpack_plugin_service_1.WebpackCopyWebpackPluginService),
    __metadata("design:type", webpack_copy_webpack_plugin_service_1.WebpackCopyWebpackPluginService)
], WebpackPluginsConfigService.prototype, "webpackCopyWebpackPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_favicons_webpack_plugin_service_1.WebpackFaviconsWebpackPluginService),
    __metadata("design:type", webpack_favicons_webpack_plugin_service_1.WebpackFaviconsWebpackPluginService)
], WebpackPluginsConfigService.prototype, "webpackFaviconsWebpackPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_html_webpack_plugin_service_1.WebpackHtmlWebpackPluginService),
    __metadata("design:type", webpack_html_webpack_plugin_service_1.WebpackHtmlWebpackPluginService)
], WebpackPluginsConfigService.prototype, "webpackHtmlWebpackPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_mini_css_extract_plugin_service_1.WebpackMiniCssExtractPluginConfigService),
    __metadata("design:type", webpack_mini_css_extract_plugin_service_1.WebpackMiniCssExtractPluginConfigService)
], WebpackPluginsConfigService.prototype, "webpackPreMiniCssExtractPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_remove_files_webpack_plugin_service_1.WebpackPreRemoveFilesWebpackPluginService),
    __metadata("design:type", webpack_remove_files_webpack_plugin_service_1.WebpackPreRemoveFilesWebpackPluginService)
], WebpackPluginsConfigService.prototype, "webpackPreRemoveFilesWebpackPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_webpack_fix_style_only_entries_service_1.WebpackWebpackFixStyleOnlyEntriesService),
    __metadata("design:type", webpack_webpack_fix_style_only_entries_service_1.WebpackWebpackFixStyleOnlyEntriesService)
], WebpackPluginsConfigService.prototype, "webpackWebpackFixStyleOnlyEntriesService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_workbox_webpack_plugin_service_1.WebpackWorkboxWebpackPluginService),
    __metadata("design:type", webpack_workbox_webpack_plugin_service_1.WebpackWorkboxWebpackPluginService)
], WebpackPluginsConfigService.prototype, "webpackWorkboxWebpackPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_tsconfig_paths_webpack_plugin_service_1.WebpackTsconfigPathsWebpackPluginService),
    __metadata("design:type", webpack_tsconfig_paths_webpack_plugin_service_1.WebpackTsconfigPathsWebpackPluginService)
], WebpackPluginsConfigService.prototype, "webpackTsconfigPathsWebpackPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_webpack_chokidar_plugin_service_1.WebpackWebpackChokidarPluginService),
    __metadata("design:type", webpack_webpack_chokidar_plugin_service_1.WebpackWebpackChokidarPluginService)
], WebpackPluginsConfigService.prototype, "webpackWebpackChokidarPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPluginConfigService),
    __metadata("design:type", webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPluginConfigService)
], WebpackPluginsConfigService.prototype, "webpackWatchEntriesPluginConfigService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_error_overlay_webpack_plugin_service_1.WebpackErrorOverlayWebpackPluginService),
    __metadata("design:type", webpack_error_overlay_webpack_plugin_service_1.WebpackErrorOverlayWebpackPluginService)
], WebpackPluginsConfigService.prototype, "webpackErrorOverlayWebpackPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_profiling_plugin_service_1.WebpackProfilingPluginService),
    __metadata("design:type", webpack_profiling_plugin_service_1.WebpackProfilingPluginService)
], WebpackPluginsConfigService.prototype, "webpackProfilingPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_webpack_bundle_analyzer_service_1.WebpackWebpackBundleAnalyzerService),
    __metadata("design:type", webpack_webpack_bundle_analyzer_service_1.WebpackWebpackBundleAnalyzerService)
], WebpackPluginsConfigService.prototype, "webpackWebpackBundleAnalyzerService", void 0);
WebpackPluginsConfigService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], WebpackPluginsConfigService);
exports.WebpackPluginsConfigService = WebpackPluginsConfigService;
let WebpackPluginsService = class WebpackPluginsService {
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
    process_webpack_providers_1.CustomInject(environment_service_1.EnvironmentService),
    __metadata("design:type", environment_service_1.EnvironmentService)
], WebpackPluginsService.prototype, "wnvironmentService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_clean_webpack_plugin_service_1.WebpackCleanWebpackPluginService),
    __metadata("design:type", webpack_clean_webpack_plugin_service_1.WebpackCleanWebpackPluginService)
], WebpackPluginsService.prototype, "webpackCleanWebpackPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_copy_webpack_plugin_service_1.WebpackCopyWebpackPluginService),
    __metadata("design:type", webpack_copy_webpack_plugin_service_1.WebpackCopyWebpackPluginService)
], WebpackPluginsService.prototype, "webpackCopyWebpackPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_favicons_webpack_plugin_service_1.WebpackFaviconsWebpackPluginService),
    __metadata("design:type", webpack_favicons_webpack_plugin_service_1.WebpackFaviconsWebpackPluginService)
], WebpackPluginsService.prototype, "webpackFaviconsWebpackPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_html_webpack_plugin_service_1.WebpackHtmlWebpackPluginService),
    __metadata("design:type", webpack_html_webpack_plugin_service_1.WebpackHtmlWebpackPluginService)
], WebpackPluginsService.prototype, "webpackHtmlWebpackPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_mini_css_extract_plugin_service_1.WebpackMiniCssExtractPluginService),
    __metadata("design:type", webpack_mini_css_extract_plugin_service_1.WebpackMiniCssExtractPluginService)
], WebpackPluginsService.prototype, "webpackMiniCssExtractPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_remove_files_webpack_plugin_service_1.WebpackRemoveFilesWebpackPluginService),
    __metadata("design:type", webpack_remove_files_webpack_plugin_service_1.WebpackRemoveFilesWebpackPluginService)
], WebpackPluginsService.prototype, "webpackRemoveFilesWebpackPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_webpack_fix_style_only_entries_service_1.WebpackWebpackFixStyleOnlyEntriesService),
    __metadata("design:type", webpack_webpack_fix_style_only_entries_service_1.WebpackWebpackFixStyleOnlyEntriesService)
], WebpackPluginsService.prototype, "webpackWebpackFixStyleOnlyEntriesService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_workbox_webpack_plugin_service_1.WebpackWorkboxWebpackPluginService),
    __metadata("design:type", webpack_workbox_webpack_plugin_service_1.WebpackWorkboxWebpackPluginService)
], WebpackPluginsService.prototype, "webpackWorkboxWebpackPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_tsconfig_paths_webpack_plugin_service_1.WebpackTsconfigPathsWebpackPluginService),
    __metadata("design:type", webpack_tsconfig_paths_webpack_plugin_service_1.WebpackTsconfigPathsWebpackPluginService)
], WebpackPluginsService.prototype, "webpackTsconfigPathsWebpackPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_webpack_chokidar_plugin_service_1.WebpackWebpackChokidarPluginService),
    __metadata("design:type", webpack_webpack_chokidar_plugin_service_1.WebpackWebpackChokidarPluginService)
], WebpackPluginsService.prototype, "webpackWebpackChokidarPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPluginService),
    __metadata("design:type", webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPluginService)
], WebpackPluginsService.prototype, "webpackWatchEntriesPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_error_overlay_webpack_plugin_service_1.WebpackErrorOverlayWebpackPluginService),
    __metadata("design:type", webpack_error_overlay_webpack_plugin_service_1.WebpackErrorOverlayWebpackPluginService)
], WebpackPluginsService.prototype, "webpackErrorOverlayWebpackPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_html_webpack_customizer_plugin_service_1.WebpackHtmlWebpackCustomizerPluginService),
    __metadata("design:type", webpack_html_webpack_customizer_plugin_service_1.WebpackHtmlWebpackCustomizerPluginService)
], WebpackPluginsService.prototype, "webpackHtmlWebpackCustomizerPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_profiling_plugin_service_1.WebpackProfilingPluginService),
    __metadata("design:type", webpack_profiling_plugin_service_1.WebpackProfilingPluginService)
], WebpackPluginsService.prototype, "webpackProfilingPluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_webpack_bundle_analyzer_service_1.WebpackWebpackBundleAnalyzerService),
    __metadata("design:type", webpack_webpack_bundle_analyzer_service_1.WebpackWebpackBundleAnalyzerService)
], WebpackPluginsService.prototype, "webpackWebpackBundleAnalyzerService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_provide_plugin_service_1.WebpackProvidePluginService),
    __metadata("design:type", webpack_provide_plugin_service_1.WebpackProvidePluginService)
], WebpackPluginsService.prototype, "webpackProvidePluginService", void 0);
__decorate([
    process_webpack_providers_1.CustomInject(webpack_svg_spritemap_webpack_plugin_service_1.WebpackSvgSpriteMapWebpackPluginService),
    __metadata("design:type", webpack_svg_spritemap_webpack_plugin_service_1.WebpackSvgSpriteMapWebpackPluginService)
], WebpackPluginsService.prototype, "webpackSvgSpriteMapWebpackPluginService", void 0);
WebpackPluginsService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], WebpackPluginsService);
exports.WebpackPluginsService = WebpackPluginsService;
//# sourceMappingURL=webpack-plugins.service.js.map