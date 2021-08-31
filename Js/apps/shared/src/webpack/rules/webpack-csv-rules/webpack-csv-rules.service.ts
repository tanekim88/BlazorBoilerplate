import { RuleSetRule } from 'webpack';
import { WebpackRulesBaseService } from '../webpack-rules-base/webpack-rules-base.service';

import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class WebpackCsvRulesService extends WebpackRulesBaseService {
    createRule(options?: RuleSetRule): RuleSetRule {
        return this.mergeService.mergeOptions(
            super.createRule(),
            {
                test: /\.(csv|tsv)$/,
                use: [
                    {
                        loader: 'csv-loader',
                        options: {},
                    },
                ],
            } as RuleSetRule,
            options,
        );
    }

    createRules() {
        return [...super.createRules(), this.createRule()];
    }
}
