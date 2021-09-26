import { PostcssBaseService } from '../../postcss-base/postcss-base.service';

const Stylelint = require('stylelint');

import { CustomInjectable } from '@projects/shared/src/functions/process-providers';

@CustomInjectable()
export class StylelintService extends PostcssBaseService {
    constructor() {
        super(Stylelint);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
