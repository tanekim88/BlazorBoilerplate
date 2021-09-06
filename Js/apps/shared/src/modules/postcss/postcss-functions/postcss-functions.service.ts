import PostcssFunctions from 'postcss-functions';

import { PostcssBaseService } from '../postcss-base/postcss-base.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class PostcssFunctionsService extends PostcssBaseService {
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
