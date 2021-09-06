import { WebpackPostcssBaseService } from '../webpack-postcss-base/webpack-postcss-base.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';

import PurgeCss from '@fullhuman/postcss-purgecss';

@CustomInjectable()
export class WebpackPostcssPurgecssService extends WebpackPostcssBaseService {
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
