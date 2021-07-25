var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CustomInject, CustomInjectable } from '@shared/src/functions/process-providers';
import { WebpackFaviconsWebpackPluginService } from '@shared/src/webpack/plugins/webpack-favicons-webpack-plugin/webpack-favicons-webpack-plugin.service';
import { BlazorAppEnvironmentService } from '../../../modules/environment/environment/environment.service';
let BlazorAppWebpackFaviconsWebpackPluginService = class BlazorAppWebpackFaviconsWebpackPluginService extends WebpackFaviconsWebpackPluginService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            logo: this.blazorAppEnvironmentService.logoPath,
        }, options);
    }
};
__decorate([
    CustomInject(BlazorAppEnvironmentService),
    __metadata("design:type", BlazorAppEnvironmentService)
], BlazorAppWebpackFaviconsWebpackPluginService.prototype, "blazorAppEnvironmentService", void 0);
BlazorAppWebpackFaviconsWebpackPluginService = __decorate([
    CustomInjectable()
], BlazorAppWebpackFaviconsWebpackPluginService);
export { BlazorAppWebpackFaviconsWebpackPluginService };
//# sourceMappingURL=webpack-favicons-webpack-plugin.service.js.map