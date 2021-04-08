import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { WebpackTsconfigPathsWebpackPluginService } from '@shared/src/webpack/plugins/webpack-tsconfig-paths-webpack-plugin/webpack-tsconfig-paths-webpack-plugin.service';

@CustomInjectable()
export class AuthWebpackTsconfigPathsWebpackPluginService extends WebpackTsconfigPathsWebpackPluginService {
    createOptions(options?) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
