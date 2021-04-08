import { WebpackPluginBaseService } from '../../plugins/webpack-plugin-base/webpack-plugin-base.service';

import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';

@CustomInjectable()
export class WebpackCssMinimizerPluginService extends WebpackPluginBaseService {
    constructor() {
        super(CssMinimizerPlugin);
    }

    createOptions(options?) {
        return this.mergeService.mergeOptions(super.createOptions(), {} as CssMinimizerPlugin.Options, options);
    }
}
