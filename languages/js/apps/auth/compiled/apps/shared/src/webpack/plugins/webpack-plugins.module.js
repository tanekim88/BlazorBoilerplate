"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackPluginsModule = void 0;
const webpack_clean_webpack_plugin_service_1 = require("./webpack-clean-webpack-plugin/webpack-clean-webpack-plugin.service");
const webpack_copy_webpack_plugin_service_1 = require("./webpack-copy-webpack-plugin/webpack-copy-webpack-plugin.service");
const webpack_favicons_webpack_plugin_service_1 = require("./webpack-favicons-webpack-plugin/webpack-favicons-webpack-plugin.service");
const webpack_html_webpack_plugin_service_1 = require("./webpack-html-webpack-plugin/webpack-html-webpack-plugin.service");
const webpack_mini_css_extract_plugin_service_1 = require("./webpack-mini-css-extract-plugin/webpack-mini-css-extract-plugin.service");
const webpack_plugins_service_1 = require("./webpack-plugins/webpack-plugins.service");
const webpack_workbox_webpack_plugin_service_1 = require("./webpack-workbox-webpack-plugin/webpack-workbox-webpack-plugin.service");
const webpack_plugin_base_service_1 = require("./webpack-plugin-base/webpack-plugin-base.service");
const process_webpack_providers_1 = require("../../functions/process-webpack-providers");
const webpack_remove_files_webpack_plugin_service_1 = require("./webpack-remove-files-webpack-plugin/webpack-remove-files-webpack-plugin.service");
const webpack_tsconfig_paths_webpack_plugin_service_1 = require("./webpack-tsconfig-paths-webpack-plugin/webpack-tsconfig-paths-webpack-plugin.service");
const webpack_webpack_chokidar_plugin_service_1 = require("./webpack-webpack-chokidar-plugin/webpack-webpack-chokidar-plugin.service");
const webpack_watch_entries_plugin_service_1 = require("./webpack-watch-entries-plugin/webpack-watch-entries-plugin.service");
const webpack_error_handler_plugin_service_1 = require("./webpack-error-handler-plugin/webpack-error-handler-plugin.service");
const webpack_error_overlay_webpack_plugin_service_1 = require("./webpack-error-overlay-webpack-plugin/webpack-error-overlay-webpack-plugin.service");
const webpack_html_webpack_customizer_plugin_service_1 = require("./webpack-html-webpack-customizer-plugin/webpack-html-webpack-customizer-plugin.service");
const webpack_profiling_plugin_service_1 = require("./webpack-profiling-plugin/webpack-profiling-plugin.service");
const webpack_webpack_bundle_analyzer_service_1 = require("./webpack-webpack-bundle-analyzer/webpack-webpack-bundle-analyzer.service");
const webpack_provide_plugin_service_1 = require("./webpack-provide-plugin/webpack-provide-plugin.service");
const webpack_webpack_pwa_manifest_service_1 = require("./webpack-webpack-pwa-manifest/webpack-webpack-pwa-manifest.service");
const webpack_svg_spritemap_webpack_plugin_service_1 = require("./webpack-svg-spritemap-webpack-plugin/webpack-svg-spritemap-webpack-plugin.service");
let WebpackPluginsModule = class WebpackPluginsModule {
};
WebpackPluginsModule = __decorate([
    process_webpack_providers_1.CustomModule({
        providers: [
            // WebpackExtractSvgSpriteWebpackPluginService,
            // WebpackSvgSpriteLoaderPluginService,
            webpack_clean_webpack_plugin_service_1.WebpackCleanWebpackPluginService,
            webpack_copy_webpack_plugin_service_1.WebpackCopyWebpackPluginService,
            webpack_error_handler_plugin_service_1.WebpackErrorHandlerPluginService,
            webpack_error_overlay_webpack_plugin_service_1.WebpackErrorOverlayWebpackPluginService,
            webpack_favicons_webpack_plugin_service_1.WebpackFaviconsWebpackPluginService,
            webpack_html_webpack_customizer_plugin_service_1.WebpackHtmlWebpackCustomizerPluginService,
            webpack_html_webpack_plugin_service_1.WebpackHtmlWebpackPluginService,
            webpack_mini_css_extract_plugin_service_1.WebpackMiniCssExtractPluginService,
            webpack_plugin_base_service_1.WebpackPluginBaseService,
            webpack_plugins_service_1.WebpackPluginsConfigService,
            webpack_plugins_service_1.WebpackPluginsService,
            webpack_remove_files_webpack_plugin_service_1.WebpackPreRemoveFilesWebpackPluginService,
            webpack_profiling_plugin_service_1.WebpackProfilingPluginService,
            webpack_provide_plugin_service_1.WebpackProvidePluginService,
            webpack_remove_files_webpack_plugin_service_1.WebpackRemoveFilesWebpackPluginService,
            webpack_tsconfig_paths_webpack_plugin_service_1.WebpackTsconfigPathsWebpackPluginService,
            webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPluginConfigService,
            webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPluginService,
            webpack_webpack_bundle_analyzer_service_1.WebpackWebpackBundleAnalyzerService,
            webpack_webpack_chokidar_plugin_service_1.WebpackWebpackChokidarPluginService,
            webpack_workbox_webpack_plugin_service_1.WebpackWorkboxWebpackPluginService,
            webpack_webpack_pwa_manifest_service_1.WebpackWebpackPwaManifestService,
            webpack_svg_spritemap_webpack_plugin_service_1.WebpackSvgSpriteMapWebpackPluginService
            // MergeService,
            // EnvironmentService,
        ],
        imports: [],
    })
], WebpackPluginsModule);
exports.WebpackPluginsModule = WebpackPluginsModule;
//# sourceMappingURL=webpack-plugins.module.js.map