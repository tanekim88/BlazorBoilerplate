var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { WebpackCleanWebpackPluginService } from '@projects/shared/src/webpack/plugins/webpack-clean-webpack-plugin/webpack-clean-webpack-plugin.service';
let BlazorAppWebpackCleanWebpackPluginService = class BlazorAppWebpackCleanWebpackPluginService extends WebpackCleanWebpackPluginService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
};
BlazorAppWebpackCleanWebpackPluginService = __decorate([
    CustomInjectable()
], BlazorAppWebpackCleanWebpackPluginService);
export { BlazorAppWebpackCleanWebpackPluginService };
//# sourceMappingURL=webpack-clean-webpack-plugin.service.js.map