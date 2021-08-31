import { RuleSetRule } from 'webpack';
import { WebpackRulesBaseService } from '../webpack-rules-base/webpack-rules-base.service';

import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class WebpackJsonRulesService extends WebpackRulesBaseService {
    createRule(options?: RuleSetRule): RuleSetRule {
        return this.mergeService.mergeOptions(
            super.createRule(),
            {
                test: /\.json5$/i,
                loader: 'json5-loader',
                options: {
                    esModule: false,
                },
                type: 'javascript/auto',
            } as RuleSetRule,
            options,
        );
    }
    createRules() {
        return [...super.createRules(), this.createRule()];
    }
}
