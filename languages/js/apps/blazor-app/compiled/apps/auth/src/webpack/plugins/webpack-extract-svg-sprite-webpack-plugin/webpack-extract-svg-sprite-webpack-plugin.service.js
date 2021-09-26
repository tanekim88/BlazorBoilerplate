var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WebpackExtractSvgSpriteWebpackPluginService } from '@projects/shared/src/webpack/plugins/webpack-extract-svg-sprite-webpack-plugin/webpack-extract-svg-sprite-webpack-plugin.service';
const ExtractSvgSpriteWebpackPlugin = require('extract-svg-sprite-webpack-plugin');
import { CustomInjectable } from '@projects/shared/src/functions/process-providers';
let AuthWebpackExtractSvgSpriteWebpackPluginService = class AuthWebpackExtractSvgSpriteWebpackPluginService extends WebpackExtractSvgSpriteWebpackPluginService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
};
AuthWebpackExtractSvgSpriteWebpackPluginService = __decorate([
    CustomInjectable()
], AuthWebpackExtractSvgSpriteWebpackPluginService);
export { AuthWebpackExtractSvgSpriteWebpackPluginService };
//# sourceMappingURL=webpack-extract-svg-sprite-webpack-plugin.service.js.map