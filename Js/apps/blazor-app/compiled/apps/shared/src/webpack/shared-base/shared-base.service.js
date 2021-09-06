var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
import { WebpackRulesService } from '../rules/webpack-rules/webpack-rules.service';
import { WebpackBaseService } from '../webpack-base/webpack-base.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';
import { CustomInject } from '#shared/src/functions/process-providers';
import { rootConfig } from '#root/configs';
import { sharedPaths } from '#shared/paths';
import { WebpackPluginsService } from '../plugins/webpack-plugins/webpack-plugins.service';
import { WebpackTsconfigPathsWebpackPluginService } from '../plugins/webpack-tsconfig-paths-webpack-plugin/webpack-tsconfig-paths-webpack-plugin.service';
const rootDir = rootConfig.rootDir;
let WebpackSharedBaseService = class WebpackSharedBaseService extends WebpackBaseService {
    webpackRulesService;
    webpackPluginsService;
    webpackTsconfigPathsWebpackPluginService;
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
                    sharedPaths.src.webpack.loaders.toAbsolutePath(),
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
    CustomInject(WebpackRulesService),
    __metadata("design:type", typeof (_a = typeof WebpackRulesService !== "undefined" && WebpackRulesService) === "function" ? _a : Object)
], WebpackSharedBaseService.prototype, "webpackRulesService", void 0);
__decorate([
    CustomInject(WebpackPluginsService),
    __metadata("design:type", typeof (_b = typeof WebpackPluginsService !== "undefined" && WebpackPluginsService) === "function" ? _b : Object)
], WebpackSharedBaseService.prototype, "webpackPluginsService", void 0);
__decorate([
    CustomInject(WebpackTsconfigPathsWebpackPluginService),
    __metadata("design:type", typeof (_c = typeof WebpackTsconfigPathsWebpackPluginService !== "undefined" && WebpackTsconfigPathsWebpackPluginService) === "function" ? _c : Object)
], WebpackSharedBaseService.prototype, "webpackTsconfigPathsWebpackPluginService", void 0);
WebpackSharedBaseService = __decorate([
    CustomInjectable()
], WebpackSharedBaseService);
export { WebpackSharedBaseService };
//# sourceMappingURL=shared-base.service.js.map