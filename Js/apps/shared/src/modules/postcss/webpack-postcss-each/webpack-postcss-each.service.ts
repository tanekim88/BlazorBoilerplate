import PostcssEach from 'postcss-each';

import { WebpackPostcssBaseService } from '../webpack-postcss-base/webpack-postcss-base.service';

import { CustomInjectable } from '@shared/src/functions/process-providers';

@CustomInjectable()
export class WebpackPostcssEachService extends WebpackPostcssBaseService {
    constructor() {
        super(PostcssEach);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                plugins: {
                    afterEach: [
                        // require('postcss-at-rules-variables')
                    ],
                    beforeEach: [
                        // require('postcss-custom-properties')
                    ],
                },
            },
            options,
        );
    }
}
