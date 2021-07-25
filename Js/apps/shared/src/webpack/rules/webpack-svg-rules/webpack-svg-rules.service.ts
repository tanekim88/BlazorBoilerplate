import { RuleSetRule } from 'webpack';
import { WebpackRulesBaseService } from '../webpack-rules-base/webpack-rules-base.service';

import { CustomInjectable } from '@shared/src/functions/process-providers';

@CustomInjectable()
export class WebpackSvgRulesService extends WebpackRulesBaseService {
    createRule(options?: RuleSetRule): RuleSetRule {
        return this.mergeService.mergeOptions(
            super.createRule(),
            {
                test: /\.svg$/,
                use: [
                    'file-loader',

                    //   {
                    //     loader: 'url-loader',
                    //     options: {
                    //       generator: (content) => svgToMiniDataURI(content.toString())
                    //       //   quality: 85,
                    //     }
                    //   }
                ],
            } as RuleSetRule,
            options,
        );
    }

    createRules() {
        return [...super.createRules(), this.createRule()];
    }
}
