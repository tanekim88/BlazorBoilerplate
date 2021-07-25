import PostcssSimpleVars from 'postcss-simple-vars';

import { WebpackPostcssBaseService } from '../webpack-postcss-base/webpack-postcss-base.service';
import { CustomInjectable } from '@shared/src/functions/process-providers';

@CustomInjectable()
export class WebpackPostcssSimpleVarsService extends WebpackPostcssBaseService {
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
