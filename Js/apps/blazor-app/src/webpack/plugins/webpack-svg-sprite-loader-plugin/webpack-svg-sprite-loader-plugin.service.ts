import { WebpackSvgSpriteLoaderPluginService } from '@shared/src/webpack/plugins/webpack-svg-sprite-loader-plugin/webpack-svg-sprite-loader-plugin.service';

const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';

@CustomInjectable()
export class BlazorAppWebpackSvgSpriteLoaderPluginService extends WebpackSvgSpriteLoaderPluginService {
    createOptions(options?) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
