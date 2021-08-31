import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class WebpackWebpackBundleAnalyzerService extends WebpackPluginBaseService {
    constructor() {
        super(BundleAnalyzerPlugin);
    }

    createOptions(options?) {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                analyzerMode: 'server',
                analyzerHost: '127.0.0.1',
                analyzerPort: 8889,
                reportFilename: 'report.html',
                defaultSizes: 'parsed',
                statsFilename: 'stats.json',
            } as BundleAnalyzerPlugin.Options,
            options,
        );
    }
}
