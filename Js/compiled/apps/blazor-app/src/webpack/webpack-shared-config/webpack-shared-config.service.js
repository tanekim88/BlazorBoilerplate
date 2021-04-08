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
exports.BlazorAppWebpackSharedConfigService = void 0;
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
const process_webpack_providers_2 = require("@shared/src/functions/process-webpack-providers");
const paths_1 = require("@blazor-app/paths");
const webpack_watch_entries_plugin_service_1 = require("@shared/src/webpack/plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service");
const webpack_shared_config_service_1 = require("@shared/src/webpack/webpack-shared-config/webpack-shared-config.service");
const environment_service_1 = require("../../modules/environment/environment/environment.service");
const webpack_rules_service_1 = require("../rules/webpack-rules/webpack-rules.service");
const webpack_plugins_service_1 = require("../plugins/webpack-plugins/webpack-plugins.service");
let BlazorAppWebpackSharedConfigService = class BlazorAppWebpackSharedConfigService extends webpack_shared_config_service_1.WebpackSharedConfigService {
    createConfiguration(options) {
        const entry = webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPlugin.getEntries([], webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPluginConfigService.name);
        return this.mergeService.mergeOptions(super.createConfiguration(), {
            entry,
            module: {
                rules: this.blazorAppClientWebpackRulesConfigService.createRules(),
            },
            plugins: this.blazorAppClientWebpackPluginsConfigService.createPlugins(),
            resolveLoader: {
                modules: [paths_1.blazorAppPaths.node_modules.toAbsolutePath()],
            },
        }, options);
    }
};
__decorate([
    process_webpack_providers_2.CustomInject(environment_service_1.BlazorAppEnvironmentService),
    __metadata("design:type", environment_service_1.BlazorAppEnvironmentService)
], BlazorAppWebpackSharedConfigService.prototype, "environmentService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_rules_service_1.BlazorAppWebpackRulesConfigService),
    __metadata("design:type", webpack_rules_service_1.BlazorAppWebpackRulesConfigService)
], BlazorAppWebpackSharedConfigService.prototype, "blazorAppClientWebpackRulesConfigService", void 0);
__decorate([
    process_webpack_providers_2.CustomInject(webpack_plugins_service_1.BlazorAppWebpackPluginsConfigService),
    __metadata("design:type", webpack_plugins_service_1.BlazorAppWebpackPluginsConfigService)
], BlazorAppWebpackSharedConfigService.prototype, "blazorAppClientWebpackPluginsConfigService", void 0);
BlazorAppWebpackSharedConfigService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], BlazorAppWebpackSharedConfigService);
exports.BlazorAppWebpackSharedConfigService = BlazorAppWebpackSharedConfigService;
//# sourceMappingURL=webpack-shared-config.service.js.map