var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CustomInjectable } from '@shared/src/functions/process-providers';
import { CustomInject } from '@shared/src/functions/process-providers';
import { blazorAppPaths } from '@blazor-app/paths';
import { WebpackWatchEntriesPlugin, WebpackWatchEntriesPluginConfigService, } from '@shared/src/webpack/plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';
import { WebpackSharedConfigService } from '@shared/src/webpack/webpack-shared-config/webpack-shared-config.service';
import { BlazorAppEnvironmentService } from '../../modules/environment/environment/environment.service';
import { BlazorAppWebpackRulesConfigService } from '../rules/webpack-rules/webpack-rules.service';
import { BlazorAppWebpackPluginsConfigService } from '../plugins/webpack-plugins/webpack-plugins.service';
let BlazorAppWebpackSharedConfigService = class BlazorAppWebpackSharedConfigService extends WebpackSharedConfigService {
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
    CustomInject(BlazorAppEnvironmentService),
    __metadata("design:type", BlazorAppEnvironmentService)
], BlazorAppWebpackSharedConfigService.prototype, "blazorAppEnvironmentService", void 0);
__decorate([
    CustomInject(BlazorAppWebpackRulesConfigService),
    __metadata("design:type", BlazorAppWebpackRulesConfigService)
], BlazorAppWebpackSharedConfigService.prototype, "blazorAppClientWebpackRulesConfigService", void 0);
__decorate([
    CustomInject(BlazorAppWebpackPluginsConfigService),
    __metadata("design:type", BlazorAppWebpackPluginsConfigService)
], BlazorAppWebpackSharedConfigService.prototype, "blazorAppClientWebpackPluginsConfigService", void 0);
BlazorAppWebpackSharedConfigService = __decorate([
    CustomInjectable()
], BlazorAppWebpackSharedConfigService);
export { BlazorAppWebpackSharedConfigService };
//# sourceMappingURL=webpack-shared-config.service.js.map