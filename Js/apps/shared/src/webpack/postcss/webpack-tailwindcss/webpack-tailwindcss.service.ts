import Tailwindcss from 'tailwindcss';

import { WebpackPostcssBaseService } from '../webpack-postcss-base/webpack-postcss-base.service';
import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import tailwindConfig from '@shared/tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig'
@CustomInjectable()
export class WebpackTailwindcssService extends WebpackPostcssBaseService {
    constructor() {
        super(Tailwindcss);
    }

    createOptions(options?: any): any {
        const resolvedConfig =  resolveConfig(tailwindConfig);
        console.dir(resolvedConfig);
        return this.mergeService.mergeOptions(super.createOptions(), {
            config: resolvedConfig,
        });
    }
}
