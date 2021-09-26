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
exports.WebpackSharedBaseService = void 0;
const webpack_rules_service_1 = require("../rules/webpack-rules/webpack-rules.service");
const webpack_base_service_1 = require("../webpack-base/webpack-base.service");
const process_webpack_providers_1 = require("#shared/src/functions/process-webpack-providers");
const process_webpack_providers_2 = require("#shared/src/functions/process-webpack-providers");
const configs_1 = require("#root/configs");
const paths_1 = require("#shared/paths");
const webpack_plugins_service_1 = require("../plugins/webpack-plugins/webpack-plugins.service");
const webpack_tsconfig_paths_webpack_plugin_service_1 = require("../plugins/webpack-tsconfig-paths-webpack-plugin/webpack-tsconfig-paths-webpack-plugin.service");
const rootDir = configs_1.rootConfig.rootDir;
let WebpackSharedBaseService = class WebpackSharedBaseService extends webpack_base_service_1.WebpackBaseService {
    createConfiguration(options) {
        return this.mergeService.mergeOptions(super.createConfiguration(), {
            output: {
                filename: '[name].js',
                path: this.environmentService.outputDir,
                publicPath: '/',
            },
            context: this.environmentService.localPaths.toAbsolutePath(),
            optimization: {
                splitChunks: { chunks: 'all', maxInitialRequests: 30, maxAsyncRequests: 30, maxSize: 100000 },
            },
            resolve: {
                enforceExtension: false,
                extensions: ['.tsx', '.ts', '.js', '.json', '.scss', '.css'],
                modules: [this.environmentService.localPaths.node_modules.toAbsolutePath()],
                plugins: [this.webpackTsconfigPathsWebpackPluginService.createPlugin()],
            },
            resolveLoader: {
                modules: [
                    paths_1.sharedPaths.src.webpack.loaders.toAbsolutePath(),
                    this.environmentService.localPaths.src.webpack.loaders.toAbsolutePath(),
                    this.environmentService.localPaths.node_modules.toAbsolutePath(),
                ],
            },
            watchOptions: {
                poll: 1000,
            },
        }, options);
    }
};
__decorate([
    process_webpack_providers_2.CustomInject(webpack_rules_service_1.WebpackRulesService),
    __metadata("design:type", webpack_rules_service_1.WebpackRulesService)
], WebpackSharedBaseService.prototype, "webpackRulesService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_plugins_service_1.WebpackPluginsService),
    __metadata("design:type", webpack_plugins_service_1.WebpackPluginsService)
], WebpackSharedBaseService.prototype, "webpackPluginsService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_tsconfig_paths_webpack_plugin_service_1.WebpackTsconfigPathsWebpackPluginService),
    __metadata("design:type", webpack_tsconfig_paths_webpack_plugin_service_1.WebpackTsconfigPathsWebpackPluginService)
], WebpackSharedBaseService.prototype, "webpackTsconfigPathsWebpackPluginService", void 0);
WebpackSharedBaseService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], WebpackSharedBaseService);
exports.WebpackSharedBaseService = WebpackSharedBaseService;
//# sourceMappingURL=webpack-shared-base.service.js.map