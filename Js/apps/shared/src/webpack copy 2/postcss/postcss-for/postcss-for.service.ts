import PostcssFor from 'postcss-for';

import { WebpackPostcssBaseService } from '../webpack-postcss-base/webpack-postcss-base.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class WebpackPostcssForService extends WebpackPostcssBaseService {
    constructor() {
        super(PostcssFor);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
