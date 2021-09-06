var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomInjectable } from '#shared/src/functions/process-providers';
import { WebpackPluginsService, WebpackPluginsConfigService, } from '#shared/src/webpack/plugins/webpack-plugins/webpack-plugins.service';
let SolidAppWebpackPluginsConfigService = class SolidAppWebpackPluginsConfigService extends WebpackPluginsConfigService {
};
SolidAppWebpackPluginsConfigService = __decorate([
    CustomInjectable()
], SolidAppWebpackPluginsConfigService);
export { SolidAppWebpackPluginsConfigService };
let SolidAppWebpackPluginsService = class SolidAppWebpackPluginsService extends WebpackPluginsService {
};
SolidAppWebpackPluginsService = __decorate([
    CustomInjectable()
], SolidAppWebpackPluginsService);
export { SolidAppWebpackPluginsService };
//# sourceMappingURL=webpack-plugins.service.js.map