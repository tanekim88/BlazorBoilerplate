var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { blazorAppPaths } from '#solid-app/paths';
import { WebpackWatchEntriesPlugin, WebpackWatchEntriesPluginConfigService, } from '#shared/src/webpack/plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';
import { WebpackSharedConfigService } from '#shared/src/webpack/webpack-shared-config/webpack-shared-config.service';
import { SolidAppEnvironmentService } from '../../modules/environment/environment/environment.service';
import { SolidAppWebpackRulesConfigService } from '../rules/webpack-rules/webpack-rules.service';
import { SolidAppWebpackPluginsConfigService } from '../plugins/webpack-plugins/webpack-plugins.service';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
let SolidAppWebpackSharedConfigService = class SolidAppWebpackSharedConfigService extends WebpackSharedConfigService {
    blazorAppEnvironmentService;
    blazorAppClientWebpackRulesConfigService;
    blazorAppClientWebpackPluginsConfigService;
    createConfiguration(options) {
        const entry = WebpackWatchEntriesPlugin.getEntries([], WebpackWatchEntriesPluginConfigService.name);
        return this.mergeService.mergeOptions(super.createConfiguration(), {
            entry,
            module: {
                rules: this.blazorAppClientWebpackRulesConfigService.createRules(),
            },
            plugins: this.blazorAppClientWebpackPluginsConfigService.createPlugins(),
            resolveLoader: {
                modules: [blazorAppPaths.node_modules.toAbsolutePath()],
            },
        }, options);
    }
};
__decorate([
    CustomInject(SolidAppEnvironmentService),
    __metadata("design:type", SolidAppEnvironmentService)
], SolidAppWebpackSharedConfigService.prototype, "blazorAppEnvironmentService", void 0);
__decorate([
    CustomInject(SolidAppWebpackRulesConfigService),
    __metadata("design:type", SolidAppWebpackRulesConfigService)
], SolidAppWebpackSharedConfigService.prototype, "blazorAppClientWebpackRulesConfigService", void 0);
__decorate([
    CustomInject(SolidAppWebpackPluginsConfigService),
    __metadata("design:type", SolidAppWebpackPluginsConfigService)
], SolidAppWebpackSharedConfigService.prototype, "blazorAppClientWebpackPluginsConfigService", void 0);
SolidAppWebpackSharedConfigService = __decorate([
    CustomInjectable()
], SolidAppWebpackSharedConfigService);
export { SolidAppWebpackSharedConfigService };
//# sourceMappingURL=webpack-shared-config.service.js.map