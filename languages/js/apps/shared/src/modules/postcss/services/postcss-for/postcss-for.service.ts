import PostcssFor from 'postcss-for';

import { PostcssBaseService } from '../../postcss-base/postcss-base.service';
import { CustomInjectable } from '@projects/shared/src/functions/process-providers';

@CustomInjectable()
export class PostcssForService extends PostcssBaseService {
    constructor() {
        super(PostcssFor);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
