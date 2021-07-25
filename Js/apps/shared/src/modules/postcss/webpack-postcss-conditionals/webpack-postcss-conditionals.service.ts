import { WebpackPostcssBaseService } from '../webpack-postcss-base/webpack-postcss-base.service';
import PostcssConditionals from 'postcss-conditionals';

import { CustomInjectable } from '@shared/src/functions/process-providers';

@CustomInjectable()
export class WebpackPostcssConditionalsService extends WebpackPostcssBaseService {
    /**
     *
     */
    constructor() {
        super(PostcssConditionals);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
