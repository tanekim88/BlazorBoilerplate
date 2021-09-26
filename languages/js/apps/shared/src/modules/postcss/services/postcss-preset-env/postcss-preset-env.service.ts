import PostcssPresetEnv from 'postcss-preset-env';

import { PostcssBaseService } from '../../postcss-base/postcss-base.service';
import { CustomInjectable } from '@projects/shared/src/functions/process-providers';

@CustomInjectable()
export class PostcssPresetEnvService extends PostcssBaseService {
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
