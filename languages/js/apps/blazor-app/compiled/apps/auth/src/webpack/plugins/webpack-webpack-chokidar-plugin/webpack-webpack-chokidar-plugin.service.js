var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const WebpackChokidarPlugin = require('webpack-chokidar-plugin');
import { CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { WebpackWebpackChokidarPluginService } from '@projects/shared/src/webpack/plugins/webpack-webpack-chokidar-plugin/webpack-webpack-chokidar-plugin.service';
let AuthWebpackWebpackChokidarPluginService = class AuthWebpackWebpackChokidarPluginService extends WebpackWebpackChokidarPluginService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
};
AuthWebpackWebpackChokidarPluginService = __decorate([
    CustomInjectable()
], AuthWebpackWebpackChokidarPluginService);
export { AuthWebpackWebpackChokidarPluginService };
//# sourceMappingURL=webpack-webpack-chokidar-plugin.service.js.map