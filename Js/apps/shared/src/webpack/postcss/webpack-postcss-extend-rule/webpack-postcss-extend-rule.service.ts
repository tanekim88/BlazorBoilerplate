import { WebpackPostcssBaseService } from '../webpack-postcss-base/webpack-postcss-base.service';
import PostcssExtendRule from 'postcss-extend-rule';

import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';

@CustomInjectable()
export class WebpackPostcssExtendRuleService extends WebpackPostcssBaseService {
    constructor() {
        super(PostcssExtendRule);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
