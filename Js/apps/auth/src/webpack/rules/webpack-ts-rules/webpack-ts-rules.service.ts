import { RuleSetRule } from 'webpack';
import { WebpackTsRulesService } from '@shared/src/webpack/rules/webpack-ts-rules/webpack-ts-rules.service';

import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';

@CustomInjectable()
export class AuthWebpackTsRulesService extends WebpackTsRulesService {
    createRule(options?: RuleSetRule): RuleSetRule {
        return this.mergeService.mergeOptions(super.createRule(), {} as RuleSetRule, options);
    }
}
