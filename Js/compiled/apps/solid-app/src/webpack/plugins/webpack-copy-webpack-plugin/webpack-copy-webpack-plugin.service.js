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
import { WebpackCopyWebpackPluginService } from '#shared/src/webpack/plugins/webpack-copy-webpack-plugin/webpack-copy-webpack-plugin.service';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { blazorAppPaths } from '#solid-app/paths';
import { SolidAppEnvironmentService } from '#solid-app/src/modules/environment/environment/environment.service';
let SolidAppWebpackCopyWebpackPluginService = class SolidAppWebpackCopyWebpackPluginService extends WebpackCopyWebpackPluginService {
    blazorAppClientEnvironmentService;
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            patterns: [
                {
                    from: path.resolve(blazorAppPaths.src.toAbsolutePath(), 'appsettings.json'),
                    to: '',
                },
                {
                    from: path.resolve(blazorAppPaths.src.toAbsolutePath(), 'appsettings.Development.json'),
                    to: '',
                },
            ],
        }, options);
    }
};
__decorate([
    CustomInject(SolidAppEnvironmentService),
    __metadata("design:type", SolidAppEnvironmentService)
], SolidAppWebpackCopyWebpackPluginService.prototype, "blazorAppClientEnvironmentService", void 0);
SolidAppWebpackCopyWebpackPluginService = __decorate([
    CustomInjectable()
], SolidAppWebpackCopyWebpackPluginService);
export { SolidAppWebpackCopyWebpackPluginService };
//# sourceMappingURL=webpack-copy-webpack-plugin.service.js.map