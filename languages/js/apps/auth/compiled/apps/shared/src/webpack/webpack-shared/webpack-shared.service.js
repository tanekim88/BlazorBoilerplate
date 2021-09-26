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
exports.WebpackSharedService = void 0;
const webpack_rules_service_1 = require("../rules/webpack-rules/webpack-rules.service");
const process_webpack_providers_1 = require("#shared/src/functions/process-webpack-providers");
const process_webpack_providers_2 = require("#shared/src/functions/process-webpack-providers");
const webpack_watch_entries_plugin_service_1 = require("../plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service");
const configs_1 = require("#root/configs");
const webpack_plugins_service_1 = require("../plugins/webpack-plugins/webpack-plugins.service");
const webpack_shared_base_service_1 = require("../webpack-shared-base/webpack-shared-base.service");
const paths_1 = require("#shared/paths");
const path_1 = __importDefault(require("path"));
const rootDir = configs_1.rootConfig.rootDir;
let WebpackSharedService = class WebpackSharedService extends webpack_shared_base_service_1.WebpackSharedBaseService {
    createConfiguration(options) {
        const entry = webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPlugin.getEntries([
            {
                patterns: [path_1.default.resolve(paths_1.sharedPaths.src.web.toAbsolutePath(), '**/index.ts')],
                patternsOptions: {
                    ignore: [
                        path_1.default.resolve(paths_1.sharedPaths.src.web.material.toAbsolutePath(), 'native/**/index.ts'),
                        path_1.default.resolve(paths_1.sharedPaths.src.web.material.toAbsolutePath(), '**/index.ts'),
                    ],
                },
                output: {
                    prefix: 'Shared_Rest'
                }
            },
            {
                patterns: [path_1.default.resolve(paths_1.sharedPaths.src.web.material.toAbsolutePath(), '**/index.ts'),],
                patternsOptions: {
                    ignore: [
                        path_1.default.resolve(paths_1.sharedPaths.src.web.material.toAbsolutePath(), 'native/**/index.ts'),
                    ],
                },
                output: {
                    prefix: 'Shared_Material'
                }
            },
            {
                patterns: [path_1.default.resolve(paths_1.sharedPaths.src.web.toAbsolutePath(), '**/index.lazy.ts')],
                patternsOptions: {
                    ignore: [
                        path_1.default.resolve(paths_1.sharedPaths.src.web.toAbsolutePath(), '**/native/**/index.lazy.ts'),
                    ],
                },
                excludeFromHtmlWebpackPlugin: true,
                output: {
                    prefix: 'Shared_Rest_Lazy'
                }
            },
            {
                patterns: [this.environmentService.localPaths.src['service-worker']['index.ts'].toAbsolutePath()],
                ignoredFromWatch: true,
                output: {
                    prefix: 'Shared_ServiceWorker'
                }
            },
        ], webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPluginService.name);
        return this.mergeService.mergeOptions(super.createConfiguration(), {
            entry,
        }, options);
    }
};
__decorate([
    process_webpack_providers_2.CustomInject(webpack_rules_service_1.WebpackRulesService),
    __metadata("design:type", webpack_rules_service_1.WebpackRulesService)
], WebpackSharedService.prototype, "webpackRulesService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_plugins_service_1.WebpackPluginsService),
    __metadata("design:type", webpack_plugins_service_1.WebpackPluginsService)
], WebpackSharedService.prototype, "webpackPluginsService", void 0);
WebpackSharedService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], WebpackSharedService);
exports.WebpackSharedService = WebpackSharedService;
//# sourceMappingURL=webpack-shared.service.js.map