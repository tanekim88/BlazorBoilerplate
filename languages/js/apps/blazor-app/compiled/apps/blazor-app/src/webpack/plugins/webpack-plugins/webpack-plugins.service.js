var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { WebpackPluginsService, WebpackPluginsConfigService, } from '@projects/shared/src/webpack/plugins/webpack-plugins/webpack-plugins.service';
let BlazorAppWebpackPluginsConfigService = class BlazorAppWebpackPluginsConfigService extends WebpackPluginsConfigService {
};
BlazorAppWebpackPluginsConfigService = __decorate([
    CustomInjectable()
], BlazorAppWebpackPluginsConfigService);
export { BlazorAppWebpackPluginsConfigService };
let BlazorAppWebpackPluginsService = class BlazorAppWebpackPluginsService extends WebpackPluginsService {
};
BlazorAppWebpackPluginsService = __decorate([
    CustomInjectable()
], BlazorAppWebpackPluginsService);
export { BlazorAppWebpackPluginsService };
//# sourceMappingURL=webpack-plugins.service.js.map