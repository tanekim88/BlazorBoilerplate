import { RuleSetRule } from 'webpack';
import { WebpackRulesBaseService } from '../webpack-rules-base/webpack-rules-base.service';

import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class WebpackImageRulesService extends WebpackRulesBaseService {
    createRule(options?: RuleSetRule): RuleSetRule {
        return this.mergeService.mergeOptions(
            super.createRule(),
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            esModule: true,
                            mimeType: true,
                            encoding: true, // or "utf8","utf16le","latin1","base64","hex","ascii","binary","ucs2"
                            // generator: (content, mimetype, encoding, resourcePath) => {
                            //   if (/\.html$/i.test(resourcePath)) {
                            //     return `data:${mimetype},${content.toString()}`;
                            //   }

                            //   return `data:${mimetype}${encoding ? `;${encoding}` : ''},${content.toString(encoding)}`;
                            // }
                            fallback: require.resolve('responsive-loader'),
                            // quality: 85
                        },
                    },
                ],
            } as RuleSetRule,
            options,
        );
    }

    createRules() {
        return [...super.createRules(), this.createRule()];
    }
}
