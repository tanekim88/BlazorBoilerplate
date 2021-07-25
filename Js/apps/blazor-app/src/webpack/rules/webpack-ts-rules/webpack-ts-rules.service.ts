import { RuleSetRule } from 'webpack';
import { WebpackTsRulesService } from '@shared/src/webpack/rules/webpack-ts-rules/webpack-ts-rules.service';

import { CustomInjectable } from '@shared/src/functions/process-providers';

@CustomInjectable()
export class BlazorAppWebpackTsRulesService extends WebpackTsRulesService {
    createRule(options?: RuleSetRule): RuleSetRule {
        return this.mergeService.mergeOptions(super.createRule(), {} as RuleSetRule, options);
    }
}
