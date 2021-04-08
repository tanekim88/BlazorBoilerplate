import { WebpackPostcssBaseService } from '../webpack-postcss-base/webpack-postcss-base.service';
// import PostcssCombineDuplicatedSelectors from 'postcss-combine-duplicated-selectors';
import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';

const PostcssCombineDuplicatedSelectors = require('postcss-combine-duplicated-selectors');
@CustomInjectable()
export class WebpackPostcssCombineDuplicatedSelectorsService extends WebpackPostcssBaseService {
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
