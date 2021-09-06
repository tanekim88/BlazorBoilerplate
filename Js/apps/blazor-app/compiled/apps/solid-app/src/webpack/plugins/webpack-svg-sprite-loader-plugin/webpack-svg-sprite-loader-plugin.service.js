var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WebpackSvgSpriteLoaderPluginService } from '#shared/src/webpack/plugins/webpack-svg-sprite-loader-plugin/webpack-svg-sprite-loader-plugin.service';
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
import { CustomInjectable } from '#shared/src/functions/process-providers';
let SolidAppWebpackSvgSpriteLoaderPluginService = class SolidAppWebpackSvgSpriteLoaderPluginService extends WebpackSvgSpriteLoaderPluginService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
};
SolidAppWebpackSvgSpriteLoaderPluginService = __decorate([
    CustomInjectable()
], SolidAppWebpackSvgSpriteLoaderPluginService);
export { SolidAppWebpackSvgSpriteLoaderPluginService };
//# sourceMappingURL=webpack-svg-sprite-loader-plugin.service.js.map