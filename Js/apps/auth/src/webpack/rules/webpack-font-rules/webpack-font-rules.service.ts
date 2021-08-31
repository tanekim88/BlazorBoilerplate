import { RuleSetRule } from 'webpack';
import { WebpackFontRulesService } from '#shared/src/webpack/rules/webpack-font-rules/webpack-font-rules.service';

import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class AuthWebpackFontRulesService extends WebpackFontRulesService {
    createRule(options?: RuleSetRule): RuleSetRule {
        return this.mergeService.mergeOptions(super.createRule(), {} as RuleSetRule, options);
    }
}
