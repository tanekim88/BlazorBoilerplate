var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CustomInjectable } from '#shared/src/functions/process-providers';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { WebpackMiniCssExtractPluginService, WebpackMiniCssExtractPluginConfigService, } from '#shared/src/webpack/plugins/webpack-mini-css-extract-plugin/webpack-mini-css-extract-plugin.service';
let SolidAppWebpackMiniCssExtractPluginConfigService = class SolidAppWebpackMiniCssExtractPluginConfigService extends WebpackMiniCssExtractPluginConfigService {
    /**
     *
     */
    constructor() {
        super(MiniCssExtractPlugin);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
};
SolidAppWebpackMiniCssExtractPluginConfigService = __decorate([
    CustomInjectable(),
    __metadata("design:paramtypes", [])
], SolidAppWebpackMiniCssExtractPluginConfigService);
export { SolidAppWebpackMiniCssExtractPluginConfigService };
let SolidAppWebpackMiniCssExtractPluginService = class SolidAppWebpackMiniCssExtractPluginService extends WebpackMiniCssExtractPluginService {
    /**
     *
     */
    constructor() {
        super(MiniCssExtractPlugin);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
};
SolidAppWebpackMiniCssExtractPluginService = __decorate([
    CustomInjectable(),
    __metadata("design:paramtypes", [])
], SolidAppWebpackMiniCssExtractPluginService);
export { SolidAppWebpackMiniCssExtractPluginService };
//# sourceMappingURL=webpack-mini-css-extract-plugin.service.js.map