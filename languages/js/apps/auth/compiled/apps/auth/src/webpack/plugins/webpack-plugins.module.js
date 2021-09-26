"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWebpackPluginsModule = void 0;
const webpack_clean_webpack_plugin_service_1 = require("./webpack-clean-webpack-plugin/webpack-clean-webpack-plugin.service");
const webpack_copy_webpack_plugin_service_1 = require("./webpack-copy-webpack-plugin/webpack-copy-webpack-plugin.service");
const webpack_favicons_webpack_plugin_service_1 = require("./webpack-favicons-webpack-plugin/webpack-favicons-webpack-plugin.service");
const webpack_html_webpack_plugin_service_1 = require("./webpack-html-webpack-plugin/webpack-html-webpack-plugin.service");
const webpack_mini_css_extract_plugin_service_1 = require("./webpack-mini-css-extract-plugin/webpack-mini-css-extract-plugin.service");
const webpack_plugins_service_1 = require("./webpack-plugins/webpack-plugins.service");
const webpack_webpack_fix_style_only_entries_service_1 = require("./webpack-webpack-fix-style-only-entries/webpack-webpack-fix-style-only-entries.service");
const webpack_workbox_webpack_plugin_service_1 = require("./webpack-workbox-webpack-plugin/webpack-workbox-webpack-plugin.service");
const process_webpack_providers_1 = require("@projects/shared/src/functions/process-webpack-providers");
const webpack_remove_files_webpack_plugin_service_1 = require("./webpack-remove-files-webpack-plugin/webpack-remove-files-webpack-plugin.service");
const webpack_tsconfig_paths_webpack_plugin_service_1 = require("./webpack-tsconfig-paths-webpack-plugin/webpack-tsconfig-paths-webpack-plugin.service");
const webpack_webpack_chokidar_plugin_service_1 = require("./webpack-webpack-chokidar-plugin/webpack-webpack-chokidar-plugin.service");
const webpack_watch_entries_plugin_service_1 = require("./webpack-watch-entries-plugin/webpack-watch-entries-plugin.service");
const webpack_plugins_module_1 = require("@projects/shared/src/webpack/plugins/webpack-plugins.module");
const webpack_html_webpack_customizer_plugin_service_1 = require("./webpack-html-webpack-customizer-plugin/webpack-html-webpack-customizer-plugin.service");
let AuthWebpackPluginsModule = class AuthWebpackPluginsModule {
};
AuthWebpackPluginsModule = __decorate([
    process_webpack_providers_1.CustomModule({
        providers: [
            // authWebpackExtractSvgSpriteWebpackPluginService,
            // authWebpackSvgSpriteLoaderPluginService,
            // authWebpackSvgSpriteLoaderPluginService,
            webpack_clean_webpack_plugin_service_1.AuthWebpackCleanWebpackPluginService,
            webpack_copy_webpack_plugin_service_1.AuthWebpackCopyWebpackPluginService,
            webpack_favicons_webpack_plugin_service_1.AuthWebpackFaviconsWebpackPluginService,
            webpack_html_webpack_plugin_service_1.AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath,
            webpack_mini_css_extract_plugin_service_1.AuthWebpackMiniCssExtractPluginService,
            webpack_plugins_service_1.AuthWebpackPluginsConfigService,
            webpack_plugins_service_1.AuthWebpackPluginsService,
            webpack_mini_css_extract_plugin_service_1.AuthWebpackMiniCssExtractPluginConfigService,
            webpack_remove_files_webpack_plugin_service_1.AuthWebpackPreRemoveFilesWebpackPluginService,
            webpack_remove_files_webpack_plugin_service_1.AuthWebpackRemoveFilesWebpackPluginService,
            webpack_tsconfig_paths_webpack_plugin_service_1.AuthWebpackTsconfigPathsWebpackPluginService,
            webpack_watch_entries_plugin_service_1.AuthWebpackWatchEntriesPluginConfigService,
            webpack_watch_entries_plugin_service_1.AuthWebpackWatchEntriesPluginService,
            webpack_webpack_chokidar_plugin_service_1.AuthWebpackWebpackChokidarPluginService,
            webpack_webpack_fix_style_only_entries_service_1.AuthWebpackWebpackFixStyleOnlyEntriesService,
            webpack_workbox_webpack_plugin_service_1.AuthWebpackWorkboxWebpackPluginService,
            webpack_html_webpack_customizer_plugin_service_1.AuthWebpackHtmlWebpackCustomizerPluginService,
        ],
        imports: [webpack_plugins_module_1.WebpackPluginsModule],
    })
], AuthWebpackPluginsModule);
exports.AuthWebpackPluginsModule = AuthWebpackPluginsModule;
//# sourceMappingURL=webpack-plugins.module.js.map