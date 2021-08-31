import { WebpackRulesBaseService } from '../webpack-rules-base/webpack-rules-base.service';
import { RuleSetRule } from 'webpack';
import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class WebpackXmlRulesService extends WebpackRulesBaseService {
    createRule(options?: RuleSetRule): RuleSetRule {
        return this.mergeService.mergeOptions(
            super.createRule(),
            {
                test: /\.xml$/,
                use: ['xml-loader'],
            } as RuleSetRule,
            options,
        );
    }

    createRules() {
        return [...super.createRules(), this.createRule()];
    }
}
