import { WebpackPostcssBaseService } from '../webpack-postcss-base/webpack-postcss-base.service';

const Stylelint = require('stylelint');

import { CustomInjectable } from '@shared/src/functions/process-providers';

@CustomInjectable()
export class WebpackStylelintService extends WebpackPostcssBaseService {
    constructor() {
        super(Stylelint);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
