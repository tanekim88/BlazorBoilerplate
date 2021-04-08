import Tailwindcss from 'tailwindcss';

import { WebpackPostcssBaseService } from '../webpack-postcss-base/webpack-postcss-base.service';
import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import tailwindConfig from '@shared/tailwind.config';

@CustomInjectable()
export class WebpackTailwindcssService extends WebpackPostcssBaseService {
    constructor() {
        super(Tailwindcss);
    }

    createOptions(options?: any): any {
        console.dir(tailwindConfig);
        return this.mergeService.mergeOptions(super.createOptions(), {
            config: tailwindConfig,
        });
    }
}
