import { RuleSetRule } from 'webpack';
import { MergeService } from '../../../modules/utilities/merge/merge/merge.service';

import { CustomInjectable } from '#shared/src/functions/process-providers';
import { CustomInject } from '#shared/src/functions/process-providers';
import { EnvironmentService } from '#shared/src/modules/environment/environment/environment.service';
import { RegexService } from '#shared/src/modules/utilities/regex/regex/regex.service';
@CustomInjectable()
export class WebpackRulesBaseService {
    @CustomInject(MergeService)
    protected mergeService: MergeService;
    @CustomInject(RegexService)
    protected regexService: RegexService;
    @CustomInject(EnvironmentService)
    protected environmentService: EnvironmentService;

    createRules(options?: RuleSetRule[]): RuleSetRule[] {
        const toReturn = options ?? [];

        return toReturn.map((x) => {
            return this.createRule(x);
        });
    }

    createRule(options?: RuleSetRule): RuleSetRule {
        return this.mergeService.mergeOptions({}, options);
    }
}
