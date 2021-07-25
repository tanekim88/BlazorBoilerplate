import { RuleSetRule } from 'webpack';
import { WebpackJsonRulesService } from '@shared/src/webpack/rules/webpack-json-rules/webpack-json-rules.service';

import { CustomInjectable } from '@shared/src/functions/process-providers';

@CustomInjectable()
export class BlazorAppWebpackJsonRulesService extends WebpackJsonRulesService {
    createRule(options?: RuleSetRule): RuleSetRule {
        return this.mergeService.mergeOptions(super.createRule(), {} as RuleSetRule, options);
    }
}
