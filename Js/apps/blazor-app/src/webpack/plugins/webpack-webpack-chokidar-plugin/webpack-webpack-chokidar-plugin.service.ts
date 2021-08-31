const WebpackChokidarPlugin = require('webpack-chokidar-plugin');

import { CustomInjectable } from '#shared/src/functions/process-providers';
import { WebpackWebpackChokidarPluginService } from '#shared/src/webpack/plugins/webpack-webpack-chokidar-plugin/webpack-webpack-chokidar-plugin.service';
@CustomInjectable()
export class BlazorAppWebpackWebpackChokidarPluginService extends WebpackWebpackChokidarPluginService {
    createOptions(options?) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
