import PostcssFunctions from 'postcss-functions';

import { WebpackPostcssBaseService } from '../webpack-postcss-base/webpack-postcss-base.service';
import { CustomInjectable } from '@shared/src/functions/process-providers';

@CustomInjectable()
export class WebpackPostcssFunctionsService extends WebpackPostcssBaseService {
    constructor() {
        super(PostcssFunctions);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                functions: {
                    //darken,
                },
            },
            options,
        );
    }
}
