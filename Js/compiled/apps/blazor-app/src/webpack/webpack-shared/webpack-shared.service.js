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
import { BlazorAppPaths, blazorAppPaths } from '@blazor-app/paths';
import path from 'path';
import { BlazorAppWebpackRulesService } from '../rules/webpack-rules/webpack-rules.service';
import { BlazorAppWebpackPluginsService } from '../plugins/webpack-plugins/webpack-plugins.service';
let BlazorAppWebpackSharedService = class BlazorAppWebpackSharedService extends WebpackSharedService {
    createConfiguration(options) {
        const entry = WebpackWatchEntriesPlugin.getEntries([
            path.resolve(BlazorAppPaths.Pages.toAbsolutePath(), '**/*.scss'),
            path.resolve(BlazorAppPaths.Shared.toAbsolutePath(), '**/*.scss'),
        ], WebpackWatchEntriesPluginService.name);
        return this.mergeService.mergeOptions(super.createConfiguration(), {
            entry,
            context: blazorAppPaths.toAbsolutePath(),
            output: {
                filename: '[name].js',
                path: BlazorAppPaths.wwwroot.toAbsolutePath(),
                publicPath: '/',
            },
            module: {
                rules: this.blazorAppClientWebpackRulesService.createRules(),
            },
            plugins: this.blazorAppClientWebpackPluginsService.createPlugins(),
            resolveLoader: {
                modules: [blazorAppPaths.node_modules.toAbsolutePath()],
            },
        }, options);
    }
};
__decorate([
    CustomInject(BlazorAppWebpackRulesService),
    __metadata("design:type", BlazorAppWebpackRulesService)
], BlazorAppWebpackSharedService.prototype, "blazorAppClientWebpackRulesService", void 0);
__decorate([
    CustomInject(BlazorAppWebpackPluginsService),
    __metadata("design:type", BlazorAppWebpackPluginsService)
], BlazorAppWebpackSharedService.prototype, "blazorAppClientWebpackPluginsService", void 0);
BlazorAppWebpackSharedService = __decorate([
    CustomInjectable()
], BlazorAppWebpackSharedService);
export { BlazorAppWebpackSharedService };
//# sourceMappingURL=webpack-shared.service.js.map