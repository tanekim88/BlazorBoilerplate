import { RuleSetRule } from 'webpack';
import { WebpackImageRulesService } from '@shared/src/webpack/rules/webpack-image-rules/webpack-image-rules.service';

import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';

@CustomInjectable()
export class AuthWebpackImageRulesService extends WebpackImageRulesService {
    createRule(options?: RuleSetRule): RuleSetRule {
        return this.mergeService.mergeOptions(super.createRule(), {} as RuleSetRule, options);
    }
}
