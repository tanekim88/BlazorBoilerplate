import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';

import webpack from 'webpack';
import path from 'path';
import { CustomInjectable } from '@shared/src/functions/process-providers';

@CustomInjectable()
export class WebpackProfilingPluginService extends WebpackPluginBaseService {
    constructor() {
        super(webpack.debug.ProfilingPlugin);
    }

    createOptions(options?) {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                outputPath: path.resolve(this.environmentService.outputDir, 'profile.json'),
            },
            options,
        );
    }
}
