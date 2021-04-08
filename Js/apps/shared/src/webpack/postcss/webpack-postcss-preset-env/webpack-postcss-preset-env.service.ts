import PostcssPresetEnv from 'postcss-preset-env';

import { WebpackPostcssBaseService } from '../webpack-postcss-base/webpack-postcss-base.service';
import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';

@CustomInjectable()
export class WebpackPostcssPresetEnvService extends WebpackPostcssBaseService {
    constructor() {
        super(PostcssPresetEnv);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                stage: 0,
                autoprefixer: { grid: false },
                // features: {
                //     'nesting-rules': true
                // },

                //preserve:options.preserve ??  false
            } as PostcssPresetEnv.pluginOptions,
            options,
        );
    }
}
