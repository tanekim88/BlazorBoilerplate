import PostcssEach from 'postcss-each';

import { PostcssBaseService } from '../postcss-base/postcss-base.service';

import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class PostcssEachService extends PostcssBaseService {
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
