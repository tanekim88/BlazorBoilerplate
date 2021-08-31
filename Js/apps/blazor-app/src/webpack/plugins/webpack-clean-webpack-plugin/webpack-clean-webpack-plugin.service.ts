import { CustomInjectable } from '#shared/src/functions/process-providers';
import { WebpackCleanWebpackPluginService } from '#shared/src/webpack/plugins/webpack-clean-webpack-plugin/webpack-clean-webpack-plugin.service';

@CustomInjectable()
export class BlazorAppWebpackCleanWebpackPluginService extends WebpackCleanWebpackPluginService {
    createOptions(options?) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
