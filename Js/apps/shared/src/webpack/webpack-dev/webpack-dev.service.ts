import { WebpackBaseService } from '../webpack-base/webpack-base.service';

import { CustomInjectable } from '@shared/src/functions/process-providers';
import { Configuration } from 'webpack';

@CustomInjectable()
export class WebpackDevService extends WebpackBaseService {
    createConfiguration(options?) {
        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            {
                mode: 'development',

                // devtool: 'inline-source-map',
                devtool: 'eval',
                // devtool: 'eval-cheap-module-source-map',
            },
            options,
        );
    }
}
