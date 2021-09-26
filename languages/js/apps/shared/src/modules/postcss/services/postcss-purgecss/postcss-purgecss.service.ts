import { PostcssBaseService } from '../../postcss-base/postcss-base.service';
import { CustomInjectable } from '@projects/shared/src/functions/process-providers';

import PurgeCss from '@fullhuman/postcss-purgecss';

@CustomInjectable()
export class PostcssPurgecssService extends PostcssBaseService {
    constructor() {
        super(PurgeCss);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:!\/]+/g) || [],
            },
            options,
        );
    }
}
