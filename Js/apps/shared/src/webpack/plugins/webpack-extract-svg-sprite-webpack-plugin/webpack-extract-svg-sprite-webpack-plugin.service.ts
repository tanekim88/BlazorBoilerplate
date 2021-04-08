import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';
const ExtractSvgSpriteWebpackPlugin = require('extract-svg-sprite-webpack-plugin');

import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';

@CustomInjectable()
export class WebpackExtractSvgSpriteWebpackPluginService extends WebpackPluginBaseService {
    constructor() {
        super(ExtractSvgSpriteWebpackPlugin);
    }

    createOptions(options?) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
