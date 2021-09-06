import { PostcssBaseService } from '../postcss-base/postcss-base.service';
import PostcssExtendRule from 'postcss-extend-rule';

import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class PostcssExtendRuleService extends PostcssBaseService {
    constructor() {
        super(PostcssExtendRule);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
