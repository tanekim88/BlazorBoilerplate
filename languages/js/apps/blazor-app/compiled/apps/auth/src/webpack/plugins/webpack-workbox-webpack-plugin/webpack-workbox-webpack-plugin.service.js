var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { authPaths } from '@projects/auth/paths';
import { CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { WebpackWorkboxWebpackPluginService } from '@projects/shared/src/webpack/plugins/webpack-workbox-webpack-plugin/webpack-workbox-webpack-plugin.service';
let AuthWebpackWorkboxWebpackPluginService = class AuthWebpackWorkboxWebpackPluginService extends WebpackWorkboxWebpackPluginService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            swSrc: authPaths.src['service-worker']['index.ts'].toAbsolutePath(),
            swDest: 'service-worker.js',
            // include: [this.environmentService.environments.localEnvironment.absolutePaths.src_logo_logoPath]
        }, options);
    }
};
AuthWebpackWorkboxWebpackPluginService = __decorate([
    CustomInjectable()
], AuthWebpackWorkboxWebpackPluginService);
export { AuthWebpackWorkboxWebpackPluginService };
//# sourceMappingURL=webpack-workbox-webpack-plugin.service.js.map