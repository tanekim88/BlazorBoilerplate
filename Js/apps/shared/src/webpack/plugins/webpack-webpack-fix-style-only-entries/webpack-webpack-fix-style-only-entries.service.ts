import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

@CustomInjectable()
export class WebpackWebpackFixStyleOnlyEntriesService extends WebpackPluginBaseService {
    constructor() {
        super(FixStyleOnlyEntriesPlugin);
    }

    createOptions(options?) {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                extensions: ['scss', 'css', 'sass'],
                silent: true,
                ignore: undefined,
            },
            options,
        );
    }
}
