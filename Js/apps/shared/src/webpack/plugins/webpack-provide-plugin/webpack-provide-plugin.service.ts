import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';

import webpack from 'webpack';
import path from 'path';
import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';

@CustomInjectable()
export class WebpackProvidePluginService extends WebpackPluginBaseService {
    constructor() {
        super(webpack.ProvidePlugin);
    }

    createOptions(options?) {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                $: 'jquery',
                jQuery: 'jquery',
            },
            options,
        );
    }
}
