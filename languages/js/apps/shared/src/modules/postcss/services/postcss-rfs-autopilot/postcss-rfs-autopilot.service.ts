import PostcssRfsAutopilot from './index';

import { PostcssBaseService } from '../../postcss-base/postcss-base.service';
import { CustomInjectable } from '@projects/shared/src/functions/process-providers';

const numbers = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64];

@CustomInjectable()
export class PostcssRfsAutopilotService extends PostcssBaseService {
    constructor() {
        super(PostcssRfsAutopilot);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                includedRules: ['*'], //Rules you want to include, e.g. font-size
                //includedSelectors: [
                //    'p #hello'
                //], //Selectors you want to include,
                includedUnits: ['px', 'rem'], //Units you want to include, e.g. px.  Noted that RFS currently only works with px and rem
                excludedRules: ['width'], //Rules you want to exclude
                excludedSelectors: [...numbers.map((num) => `.w-${num}`)], //Selectors you want to exclude
                //excludedUnits: [], //Units you want to exclude
                silentConsole: true,
            },
            options,
        );
    }
}
