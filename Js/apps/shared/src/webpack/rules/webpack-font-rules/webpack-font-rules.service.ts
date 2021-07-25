import { RuleSetRule } from 'webpack';
import { WebpackRulesBaseService } from '../webpack-rules-base/webpack-rules-base.service';

import { CustomInjectable } from '@shared/src/functions/process-providers';

@CustomInjectable()
export class WebpackFontRulesService extends WebpackRulesBaseService {
    createRule(options?: RuleSetRule): RuleSetRule {
        return this.mergeService.mergeOptions(
            super.createRule(),
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: ['file-loader'],
            } as RuleSetRule,
            options,
        );
    }

    createRules() {
        return [...super.createRules(), this.createRule()];
    }
}
