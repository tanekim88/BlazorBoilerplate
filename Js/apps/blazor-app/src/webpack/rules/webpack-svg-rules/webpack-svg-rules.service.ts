import { RuleSetRule } from 'webpack';
import { WebpackSvgRulesService } from '#shared/src/webpack/rules/webpack-svg-rules/webpack-svg-rules.service';

import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class BlazorAppWebpackSvgRulesService extends WebpackSvgRulesService {
    createRule(options?: RuleSetRule): RuleSetRule {
        return this.mergeService.mergeOptions(super.createRule(), {} as RuleSetRule, options);
    }
}
