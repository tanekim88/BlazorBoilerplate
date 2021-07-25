var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CustomInjectable } from '@shared/src/functions/process-providers';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';
let WebpackWorkboxWebpackPluginService = class WebpackWorkboxWebpackPluginService extends WebpackPluginBaseService {
    constructor() {
        super(WorkboxWebpackPlugin.InjectManifest);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            swSrc: this.environmentService.localPaths.src['service-worker']['index.ts'].toAbsolutePath(),
            swDest: 'service-worker.js',
            include: [this.environmentService.logoPath],
        }, options);
    }
};
WebpackWorkboxWebpackPluginService = __decorate([
    CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackWorkboxWebpackPluginService);
export { WebpackWorkboxWebpackPluginService };
//# sourceMappingURL=webpack-workbox-webpack-plugin.service.js.map