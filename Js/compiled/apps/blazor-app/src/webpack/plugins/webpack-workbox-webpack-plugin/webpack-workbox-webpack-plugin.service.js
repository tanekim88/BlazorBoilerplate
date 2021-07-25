var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { blazorAppPaths } from '@blazor-app/paths';
import { CustomInjectable } from '@shared/src/functions/process-providers';
import { WebpackWorkboxWebpackPluginService } from '@shared/src/webpack/plugins/webpack-workbox-webpack-plugin/webpack-workbox-webpack-plugin.service';
let BlazorAppWebpackWorkboxWebpackPluginService = class BlazorAppWebpackWorkboxWebpackPluginService extends WebpackWorkboxWebpackPluginService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            swSrc: blazorAppPaths.src['service-worker']['index.ts'].toAbsolutePath(),
            swDest: 'service-worker.js',
        }, options);
    }
};
BlazorAppWebpackWorkboxWebpackPluginService = __decorate([
    CustomInjectable()
], BlazorAppWebpackWorkboxWebpackPluginService);
export { BlazorAppWebpackWorkboxWebpackPluginService };
//# sourceMappingURL=webpack-workbox-webpack-plugin.service.js.map