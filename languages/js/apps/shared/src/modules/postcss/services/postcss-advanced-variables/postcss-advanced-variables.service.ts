import { PostcssBaseService } from '../../postcss-base/postcss-base.service';
import PostcssAdvancedVariables from 'postcss-advanced-variables';

import { CustomInjectable } from '@projects/shared/src/functions/process-providers';

@CustomInjectable()
export class PostcssAdvancedVariablesService extends PostcssBaseService {
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
