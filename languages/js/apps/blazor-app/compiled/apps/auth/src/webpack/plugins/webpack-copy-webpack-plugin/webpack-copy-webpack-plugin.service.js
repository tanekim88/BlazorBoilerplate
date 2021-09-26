var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import path from 'path';
import { WebpackCopyWebpackPluginService } from '@projects/shared/src/webpack/plugins/webpack-copy-webpack-plugin/webpack-copy-webpack-plugin.service';
import { CustomInject, CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { authPaths } from '@projects/auth/paths';
import { AuthEnvironmentService } from '@projects/auth/src/modules/environment/environment/environment.service';
let AuthWebpackCopyWebpackPluginService = class AuthWebpackCopyWebpackPluginService extends WebpackCopyWebpackPluginService {
    authEnvironmentService;
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            patterns: [
                {
                    from: path.resolve(authPaths.src.toAbsolutePath(), 'appsettings.json'),
                    to: '',
                },
                {
                    from: path.resolve(authPaths.src.toAbsolutePath(), 'appsettings.Development.json'),
                    to: '',
                },
            ],
        }, options);
    }
};
__decorate([
    CustomInject(AuthEnvironmentService),
    __metadata("design:type", AuthEnvironmentService)
], AuthWebpackCopyWebpackPluginService.prototype, "authEnvironmentService", void 0);
AuthWebpackCopyWebpackPluginService = __decorate([
    CustomInjectable()
], AuthWebpackCopyWebpackPluginService);
export { AuthWebpackCopyWebpackPluginService };
//# sourceMappingURL=webpack-copy-webpack-plugin.service.js.map