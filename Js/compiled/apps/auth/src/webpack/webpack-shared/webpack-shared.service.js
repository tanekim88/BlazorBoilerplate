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
import { WebpackWatchEntriesPlugin, WebpackWatchEntriesPluginService, } from '@shared/src/webpack/plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';
import { WebpackSharedService } from '@shared/src/webpack/webpack-shared/webpack-shared.service';
import { AuthPaths, authPaths } from '@auth/paths';
import path from 'path';
import { AuthEnvironmentService } from '../../modules/environment/environment/environment.service';
import { AuthWebpackRulesService } from '../rules/webpack-rules/webpack-rules.service';
import { AuthWebpackPluginsService } from '../plugins/webpack-plugins/webpack-plugins.service';
import { sharedPaths } from '@shared/paths';
let AuthWebpackSharedService = class AuthWebpackSharedService extends WebpackSharedService {
    authEnvironmentService;
    authWebpackRulesService;
    authWebpackPluginsService;
    createConfiguration(options) {
        const entry = WebpackWatchEntriesPlugin.getEntries([
            {
                patterns: [
                    path.resolve(AuthPaths.Views.toAbsolutePath(), '**/*.scss'),
                    path.resolve(AuthPaths.Pages.toAbsolutePath(), '**/*.scss'),
                    path.resolve(AuthPaths.Areas.toAbsolutePath(), '**/*.scss'),
                ],
                output: {
                    prefix: 'Auth',
                    extensions: [{
                            name: '.css',
                            ignoredFromWatch: true,
                        }, {
                            name: '.cshtml',
                            ignoredFromWatch: true,
                        }],
                }
            },
            {
                patterns: [
                    path.resolve(sharedPaths.src.web.material.toAbsolutePath(), 'native/**/index.ts'),
                ],
                output: {
                    prefix: 'Shared_NativeMaterial'
                }
            },
        ], WebpackWatchEntriesPluginService.name);
        return this.mergeService.mergeOptions(super.createConfiguration(), {
            entry,
            context: authPaths.toAbsolutePath(),
            output: {
                filename: '[name].js',
                path: AuthPaths.wwwroot.toAbsolutePath(),
                publicPath: '/',
            },
            module: {
                rules: this.authWebpackRulesService.createRules(),
            },
            plugins: this.authWebpackPluginsService.createPlugins(),
            resolveLoader: {
                modules: [authPaths.node_modules.toAbsolutePath()],
            },
        }, options);
    }
};
__decorate([
    CustomInject(AuthEnvironmentService),
    __metadata("design:type", AuthEnvironmentService)
], AuthWebpackSharedService.prototype, "authEnvironmentService", void 0);
__decorate([
    CustomInject(AuthWebpackRulesService),
    __metadata("design:type", AuthWebpackRulesService)
], AuthWebpackSharedService.prototype, "authWebpackRulesService", void 0);
__decorate([
    CustomInject(AuthWebpackPluginsService),
    __metadata("design:type", AuthWebpackPluginsService)
], AuthWebpackSharedService.prototype, "authWebpackPluginsService", void 0);
AuthWebpackSharedService = __decorate([
    CustomInjectable()
], AuthWebpackSharedService);
export { AuthWebpackSharedService };
//# sourceMappingURL=webpack-shared.service.js.map