import { RuleSetRule } from 'webpack';
import { WebpackXmlRulesService } from '#shared/src/webpack/rules/webpack-xml-rules/webpack-xml-rules.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class BlazorAppWebpackXmlRulesService extends WebpackXmlRulesService {
    createRule(options?: RuleSetRule): RuleSetRule {
        return this.mergeService.mergeOptions(super.createRule(), {} as RuleSetRule, options);
    }
}
