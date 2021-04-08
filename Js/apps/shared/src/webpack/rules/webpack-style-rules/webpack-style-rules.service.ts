import { RuleSetRule } from 'webpack';
import { WebpackRulesBaseService } from '../webpack-rules-base/webpack-rules-base.service';

import sass from 'sass';

import { WebpackPostcssService } from '../../postcss/webpack-postcss/webpack-postcss.service';
import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { CustomInject } from '@shared/src/functions/process-webpack-providers';

import { sharedPaths } from '@shared/paths';
import { rootPaths } from '@root/paths';
import nodeSassUtils from 'node-sass-utils';

import { sassVariables } from '@shared/src/web/material/variables/sass-variables';

const sassUtils = nodeSassUtils(sass);

@CustomInjectable()
export class WebpackStyleRulesService extends WebpackRulesBaseService {
    @CustomInject(WebpackPostcssService)
    private webpackPostcssService: WebpackPostcssService;

    createRule(options?: RuleSetRule): RuleSetRule {
        return this.mergeService.mergeOptions(
            super.createRule(),
            {
                test: /\.(s[ac]ss|css)$/i,
                use: [
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                ident: 'postcss',
                                plugins: this.webpackPostcssService.createPostcssPlugins(),
                            },
                        },
                    },
                    {
                        loader: 'webpack-custom-sass-loader',
                        options: {
                            implementation: sass,
                            sassOptions: {
                                includePaths: [
                                    sharedPaths.node_modules.toAbsolutePath(),
                                    rootPaths.toAbsolutePath(),
                                ],
                                functions: {
                                    'get($keys)': function (keys) {
                                        let result = sassVariables as any;

                                        keys = keys.getValue().split('.');

                                        for (let i = 0; i < keys.length; i++) {
                                            result = result[keys[i]];
                                        }

                                        return sassUtils.castToSass(result);
                                    },
                                },
                                // importer: (url: string, prev, done) => {
                                //     url = url.replace('~', this.environmentService.localPaths.node_modules + '/');

                                //     return { file: url };
                                // },
                            },
                        },
                    },
                ],
            } as RuleSetRule,
            options,
        );
    }

    createRules() {
        return [
            // this.createRule({
            //     test: /\_export.scss$/,
            //     use: [
            //         MergeCommand.prepend(
            //             {
            //                 loader: '@teamsupercell/typings-for-css-modules-loader',
            //                 options: {
            //                     formatter: 'prettier',
            //                 },
            //             },
            //             {
            //                 loader: 'css-loader',
            //                 options: { modules: true },
            //             },
            //         ),
            //     ],
            // }),
        ];
    }
}
