import PostcssSassyImport from 'postcss-sassy-import';

import { PostcssBaseService } from '../postcss-base/postcss-base.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class PostcssSassyImportService extends PostcssBaseService {
    constructor() {
        super(PostcssSassyImport);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
