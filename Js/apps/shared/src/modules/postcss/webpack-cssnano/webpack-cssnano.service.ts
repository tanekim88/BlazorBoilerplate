import { WebpackPostcssBaseService } from '../webpack-postcss-base/webpack-postcss-base.service';
import CssNano from 'cssnano';

import { CustomInjectable } from '@shared/src/functions/process-providers';

@CustomInjectable()
export class WebpackCssnanoService extends WebpackPostcssBaseService {
    /**
     *
     */
    constructor() {
        super(CssNano);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
