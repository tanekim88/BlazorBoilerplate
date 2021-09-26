import { PostcssBaseService } from '../../postcss-base/postcss-base.service';
import CssNano from 'cssnano';

import { CustomInjectable } from '@projects/shared/src/functions/process-providers';

@CustomInjectable()
export class CssnanoService extends PostcssBaseService {
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
