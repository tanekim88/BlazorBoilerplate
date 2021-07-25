import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { WebpackPluginBaseService } from '../../plugins/webpack-plugin-base/webpack-plugin-base.service';

import { CustomInjectable } from '@shared/src/functions/process-providers';

@CustomInjectable()
export class WebpackOptimizeCssAssetsPluginService extends WebpackPluginBaseService {
    constructor() {
        super(OptimizeCssAssetsPlugin);
    }

    createOptions(options?: OptimizeCssAssetsPlugin.Options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
