var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { CustomInject } from '@projects/shared/src/functions/process-providers';
import { authPaths } from '@projects/auth/paths';
import { WebpackWatchEntriesPlugin, WebpackWatchEntriesPluginConfigService, } from '@projects/shared/src/webpack/plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';
import { WebpackSharedConfigService } from '@projects/shared/src/webpack/webpack-shared-config/webpack-shared-config.service';
import { AuthEnvironmentService } from '../../modules/environment/environment/environment.service';
import { AuthWebpackRulesConfigService } from '../rules/webpack-rules/webpack-rules.service';
import { AuthWebpackPluginsConfigService } from '../plugins/webpack-plugins/webpack-plugins.service';
let AuthWebpackSharedConfigService = class AuthWebpackSharedConfigService extends WebpackSharedConfigService {
    authEnvironmentService;
    authWebpackRulesConfigService;
    authWebpackPluginsConfigService;
    createConfiguration(options) {
        const entry = WebpackWatchEntriesPlugin.getEntries([], WebpackWatchEntriesPluginConfigService.name);
        return this.mergeService.mergeOptions(super.createConfiguration(), {
            entry,
            module: {
                rules: this.authWebpackRulesConfigService.createRules(),
            },
            plugins: this.authWebpackPluginsConfigService.createPlugins(),
            resolveLoader: {
                modules: [authPaths.node_modules.toAbsolutePath()],
            },
        }, options);
    }
};
__decorate([
    CustomInject(AuthEnvironmentService),
    __metadata("design:type", AuthEnvironmentService)
], AuthWebpackSharedConfigService.prototype, "authEnvironmentService", void 0);
__decorate([
    CustomInject(AuthWebpackRulesConfigService),
    __metadata("design:type", AuthWebpackRulesConfigService)
], AuthWebpackSharedConfigService.prototype, "authWebpackRulesConfigService", void 0);
__decorate([
    CustomInject(AuthWebpackPluginsConfigService),
    __metadata("design:type", AuthWebpackPluginsConfigService)
], AuthWebpackSharedConfigService.prototype, "authWebpackPluginsConfigService", void 0);
AuthWebpackSharedConfigService = __decorate([
    CustomInjectable()
], AuthWebpackSharedConfigService);
export { AuthWebpackSharedConfigService };
//# sourceMappingURL=webpack-shared-config.service.js.map