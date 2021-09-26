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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWebpackSharedService = void 0;
const process_webpack_providers_1 = require("#shared/src/functions/process-webpack-providers");
const process_webpack_providers_2 = require("#shared/src/functions/process-webpack-providers");
const webpack_watch_entries_plugin_service_1 = require("#shared/src/webpack/plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service");
const webpack_shared_service_1 = require("#shared/src/webpack/webpack-shared/webpack-shared.service");
const paths_1 = require("#auth/paths");
const path_1 = __importDefault(require("path"));
const environment_service_1 = require("../../modules/environment/environment/environment.service");
const webpack_rules_service_1 = require("../rules/webpack-rules/webpack-rules.service");
const webpack_plugins_service_1 = require("../plugins/webpack-plugins/webpack-plugins.service");
const paths_2 = require("#shared/paths");
let AuthWebpackSharedService = class AuthWebpackSharedService extends webpack_shared_service_1.WebpackSharedService {
    createConfiguration(options) {
        const entry = webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPlugin.getEntries([
            {
                patterns: [
                    path_1.default.resolve(paths_1.AuthPaths.Views.toAbsolutePath(), '**/*.scss'),
                    path_1.default.resolve(paths_1.AuthPaths.Pages.toAbsolutePath(), '**/*.scss'),
                    path_1.default.resolve(paths_1.AuthPaths.Areas.Identity.toAbsolutePath(), '**/*.scss'),
                ],
                output: {
                    prefix: 'Auth'
                }
            },
            {
                patterns: [
                    path_1.default.resolve(paths_2.sharedPaths.src.web.material.toAbsolutePath(), 'native/**/index.ts'),
                ],
                output: {
                    prefix: 'Shared_NativeMaterial'
                }
            },
        ], webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPluginService.name);
        return this.mergeService.mergeOptions(super.createConfiguration(), {
            entry,
            context: paths_1.authPaths.toAbsolutePath(),
            output: {
                filename: '[name].js',
                path: paths_1.AuthPaths.wwwroot.toAbsolutePath(),
                publicPath: '/',
            },
            module: {
                rules: this.authWebpackRulesService.createRules(),
            },
            plugins: this.authWebpackPluginsService.createPlugins(),
            resolveLoader: {
                modules: [paths_1.authPaths.node_modules.toAbsolutePath()],
            },
        }, options);
    }
};
__decorate([
    process_webpack_providers_2.CustomInject(environment_service_1.AuthEnvironmentService),
    __metadata("design:type", environment_service_1.AuthEnvironmentService)
], AuthWebpackSharedService.prototype, "environmentService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_rules_service_1.AuthWebpackRulesService),
    __metadata("design:type", webpack_rules_service_1.AuthWebpackRulesService)
], AuthWebpackSharedService.prototype, "authWebpackRulesService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_plugins_service_1.AuthWebpackPluginsService),
    __metadata("design:type", webpack_plugins_service_1.AuthWebpackPluginsService)
], AuthWebpackSharedService.prototype, "authWebpackPluginsService", void 0);
AuthWebpackSharedService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], AuthWebpackSharedService);
exports.AuthWebpackSharedService = AuthWebpackSharedService;
//# sourceMappingURL=webpack-shared.service.js.map