import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';

const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class WebpackSvgSpriteLoaderPluginService extends WebpackPluginBaseService {
    constructor() {
        super(SpriteLoaderPlugin);
    }

    createOptions(options?) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
