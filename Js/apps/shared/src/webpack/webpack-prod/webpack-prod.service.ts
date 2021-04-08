import { WebpackBaseService } from '../webpack-base/webpack-base.service';
import { WebpackMinimizersService } from '../minimizers/webpack-minimizers/webpack-minimizers.service';

import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { CustomInject } from '@shared/src/functions/process-webpack-providers';
import { Configuration } from 'webpack';

@CustomInjectable()
export class WebpackProdService extends WebpackBaseService {
    @CustomInject(WebpackMinimizersService)
    private webpackMinimizersService: WebpackMinimizersService;

    createConfiguration(options?) {
        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            {
                output: {
                    filename: '[name].js',
                },
                mode: 'production',
                devtool: 'source-map',
                optimization: {
                    minimize: true,
                    minimizer: this.webpackMinimizersService.createMinimizers(),
                    usedExports: true,
                },
                // plugins: this.webpackPluginsService.createPlugins(),
            } as Configuration,
            options,
        );
    }
}
