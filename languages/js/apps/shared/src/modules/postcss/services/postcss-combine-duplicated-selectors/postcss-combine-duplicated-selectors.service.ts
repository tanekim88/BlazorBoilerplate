import { PostcssBaseService } from '../../postcss-base/postcss-base.service';
import PostcssCombineDuplicatedSelectors from 'postcss-combine-duplicated-selectors';
import { CustomInjectable } from '#shared/src/functions/process-providers';

// const PostcssCombineDuplicatedSelectors = require('postcss-combine-duplicated-selectors');
@CustomInjectable()
export class PostcssCombineDuplicatedSelectorsService extends PostcssBaseService {
    /**
     *
     */
    constructor() {
        super(PostcssCombineDuplicatedSelectors);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                removeDuplicatedProperties: true,
            },
            options,
        );
    }
}
