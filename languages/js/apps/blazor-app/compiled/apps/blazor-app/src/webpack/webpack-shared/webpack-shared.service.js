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
import { WebpackWatchEntriesPlugin, WebpackWatchEntriesPluginService, } from '@projects/shared/src/webpack/plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';
import { WebpackSharedService } from '@projects/shared/src/webpack/webpack-shared/webpack-shared.service';
import { blazorAppPaths } from '@projects/blazor-app/paths';
import path from 'path';
import { BlazorAppWebpackRulesService } from '../rules/webpack-rules/webpack-rules.service';
import { BlazorAppWebpackPluginsService } from '../plugins/webpack-plugins/webpack-plugins.service';
let BlazorAppWebpackSharedService = class BlazorAppWebpackSharedService extends WebpackSharedService {
    BlazorAppClientWebpackRulesService;
    BlazorAppClientWebpackPluginsService;
    createConfiguration(options) {
        const entry = WebpackWatchEntriesPlugin.getEntries([
            path.resolve(blazorAppPaths.Pages.toAbsolutePath(), '**/*.scss'),
            path.resolve(blazorAppPaths.Shared.toAbsolutePath(), '**/*.scss'),
        ], WebpackWatchEntriesPluginService.name);
        return this.mergeService.mergeOptions(super.createConfiguration(), {
            entry,
            context: blazorAppPaths.toAbsolutePath(),
            output: {
                filename: '[name].js',
                path: blazorAppPaths.wwwroot.toAbsolutePath(),
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
], BlazorAppWebpackSharedService.prototype, "BlazorAppClientWebpackRulesService", void 0);
__decorate([
    CustomInject(BlazorAppWebpackPluginsService),
    __metadata("design:type", BlazorAppWebpackPluginsService)
], BlazorAppWebpackSharedService.prototype, "BlazorAppClientWebpackPluginsService", void 0);
BlazorAppWebpackSharedService = __decorate([
    CustomInjectable()
], BlazorAppWebpackSharedService);
export { BlazorAppWebpackSharedService };
//# sourceMappingURL=webpack-shared.service.js.map