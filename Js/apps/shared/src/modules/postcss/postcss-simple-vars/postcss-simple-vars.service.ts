import PostcssSimpleVars from 'postcss-simple-vars';

import { PostcssBaseService } from '../postcss-base/postcss-base.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class PostcssSimpleVarsService extends PostcssBaseService {
    constructor() {
        super(PostcssSimpleVars);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                silent: false,
            } as PostcssSimpleVars.ISimpleVarsArgument,
            options,
        );
    }
}
