import { WebpackPostcssBaseService } from '../webpack-postcss-base/webpack-postcss-base.service';
import PostcssAdvancedVariables from 'postcss-advanced-variables';

import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';

@CustomInjectable()
export class WebpackPostcssAdvancedVariablesService extends WebpackPostcssBaseService {
    /**
     *
     */
    constructor() {
        super(PostcssAdvancedVariables);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
