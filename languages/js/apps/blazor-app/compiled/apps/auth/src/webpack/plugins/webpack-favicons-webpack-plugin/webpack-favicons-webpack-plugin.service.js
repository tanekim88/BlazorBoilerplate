var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CustomInject, CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { WebpackFaviconsWebpackPluginService } from '@projects/shared/src/webpack/plugins/webpack-favicons-webpack-plugin/webpack-favicons-webpack-plugin.service';
import { AuthEnvironmentService } from '../../../modules/environment/environment/environment.service';
let AuthWebpackFaviconsWebpackPluginService = class AuthWebpackFaviconsWebpackPluginService extends WebpackFaviconsWebpackPluginService {
    authEnvironmentService;
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            logo: this.authEnvironmentService.logoPath, // svg works t
        }, options);
    }
};
__decorate([
    CustomInject(AuthEnvironmentService),
    __metadata("design:type", AuthEnvironmentService)
], AuthWebpackFaviconsWebpackPluginService.prototype, "authEnvironmentService", void 0);
AuthWebpackFaviconsWebpackPluginService = __decorate([
    CustomInjectable()
], AuthWebpackFaviconsWebpackPluginService);
export { AuthWebpackFaviconsWebpackPluginService };
//# sourceMappingURL=webpack-favicons-webpack-plugin.service.js.map