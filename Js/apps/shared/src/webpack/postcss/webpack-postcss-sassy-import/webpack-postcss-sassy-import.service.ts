import PostcssSassyImport from 'postcss-sassy-import';

import { WebpackPostcssBaseService } from '../webpack-postcss-base/webpack-postcss-base.service';
import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';

@CustomInjectable()
export class WebpackPostcssSassyImportService extends WebpackPostcssBaseService {
    constructor() {
        super(PostcssSassyImport);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
