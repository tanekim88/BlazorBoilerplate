var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WebpackBaseService } from '../webpack-base/webpack-base.service';
import { WebpackMinimizersService } from '../minimizers/webpack-minimizers/webpack-minimizers.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';
import { CustomInject } from '#shared/src/functions/process-providers';
let WebpackProdService = class WebpackProdService extends WebpackBaseService {
    webpackMinimizersService;
    createConfiguration(options) {
        return this.mergeService.mergeOptions(super.createConfiguration(), {
            output: {
                filename: '[name].js',
            },
            mode: 'production',
            devtool: 'source-map',
            optimization: {
                minimize: true,
                minimizer: this.webpackMinimizersService.createMinimizers(),
                usedExports: true,
            },
            // plugins: this.webpackPluginsService.createPlugins(),
        }, options);
    }
};
__decorate([
    CustomInject(WebpackMinimizersService),
    __metadata("design:type", WebpackMinimizersService)
], WebpackProdService.prototype, "webpackMinimizersService", void 0);
WebpackProdService = __decorate([
    CustomInjectable()
], WebpackProdService);
export { WebpackProdService };
//# sourceMappingURL=webpack-prod.service.js.map