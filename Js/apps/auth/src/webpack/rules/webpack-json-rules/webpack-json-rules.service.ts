import { RuleSetRule } from 'webpack';
import { WebpackJsonRulesService } from '@shared/src/webpack/rules/webpack-json-rules/webpack-json-rules.service';

import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';

@CustomInjectable()
export class AuthWebpackJsonRulesService extends WebpackJsonRulesService {
    createRule(options?: RuleSetRule): RuleSetRule {
        return this.mergeService.mergeOptions(super.createRule(), {} as RuleSetRule, options);
    }
}
