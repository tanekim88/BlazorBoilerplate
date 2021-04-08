import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin';
import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';

@CustomInjectable()
export class WebpackTsconfigPathsWebpackPluginService extends WebpackPluginBaseService {
    constructor() {
        super(TsconfigPathsWebpackPlugin);
    }

    createOptions(options?) {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                configFile: this.environmentService.localPaths['tsconfig.json'].toAbsolutePath(),
            },
            options,
        );
    }
}
