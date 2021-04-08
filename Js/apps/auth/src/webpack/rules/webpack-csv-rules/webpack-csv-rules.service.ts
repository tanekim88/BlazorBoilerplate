import { RuleSetRule } from 'webpack';
import { WebpackCsvRulesService } from '@shared/src/webpack/rules/webpack-csv-rules/webpack-csv-rules.service';

import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';

@CustomInjectable()
export class AuthWebpackCsvRulesService extends WebpackCsvRulesService {
    createRule(options?: RuleSetRule): RuleSetRule {
        return this.mergeService.mergeOptions(super.createRule(), {} as RuleSetRule, options);
    }
}
