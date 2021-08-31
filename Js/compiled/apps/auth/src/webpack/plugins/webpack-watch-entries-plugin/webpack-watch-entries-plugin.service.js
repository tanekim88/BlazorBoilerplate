var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomInjectable } from '#shared/src/functions/process-providers';
import { WebpackWatchEntriesPluginConfigService, WebpackWatchEntriesPluginService, } from '#shared/src/webpack/plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';
let AuthWebpackWatchEntriesPluginConfigService = class AuthWebpackWatchEntriesPluginConfigService extends WebpackWatchEntriesPluginConfigService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            id: WebpackWatchEntriesPluginConfigService.name,
            outputPath: this.environmentService.outputDir,
        }, options);
    }
};
AuthWebpackWatchEntriesPluginConfigService = __decorate([
    CustomInjectable()
], AuthWebpackWatchEntriesPluginConfigService);
export { AuthWebpackWatchEntriesPluginConfigService };
let AuthWebpackWatchEntriesPluginService = class AuthWebpackWatchEntriesPluginService extends WebpackWatchEntriesPluginService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            id: WebpackWatchEntriesPluginService.name,
            outputPath: this.environmentService.outputDir,
        }, options);
    }
};
AuthWebpackWatchEntriesPluginService = __decorate([
    CustomInjectable()
], AuthWebpackWatchEntriesPluginService);
export { AuthWebpackWatchEntriesPluginService };
//# sourceMappingURL=webpack-watch-entries-plugin.service.js.map