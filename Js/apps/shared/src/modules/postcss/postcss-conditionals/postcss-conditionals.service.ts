import { PostcssBaseService } from '../postcss-base/postcss-base.service';
import PostcssConditionals from 'postcss-conditionals';

import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class PostcssConditionalsService extends PostcssBaseService {
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
