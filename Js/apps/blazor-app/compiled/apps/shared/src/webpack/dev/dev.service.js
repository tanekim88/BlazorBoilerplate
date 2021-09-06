var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WebpackBaseService } from '../webpack-base/webpack-base.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';
let WebpackDevService = class WebpackDevService extends WebpackBaseService {
    createConfiguration(options) {
        return this.mergeService.mergeOptions(super.createConfiguration(), {
            mode: 'development',
            // devtool: 'inline-source-map',
            devtool: 'eval',
            // devtool: 'eval-cheap-module-source-map',
        }, options);
    }
};
WebpackDevService = __decorate([
    CustomInjectable()
], WebpackDevService);
export { WebpackDevService };
//# sourceMappingURL=dev.service.js.map