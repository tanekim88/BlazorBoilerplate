import { RuleSetRule } from 'webpack';

import { WebpackStyleRulesService } from '@shared/src/webpack/rules/webpack-style-rules/webpack-style-rules.service';

import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { MergeCommand } from '@shared/src/modules/utilities/merge/merge/merge-command';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { AuthPaths, authPaths } from '@auth/paths';
import path from 'path';
@CustomInjectable()
export class AuthWebpackStyleRulesService extends WebpackStyleRulesService {
    createRule(options?: RuleSetRule): RuleSetRule {
        return this.mergeService.mergeOptions(super.createRule(), {} as RuleSetRule, options);
    }

    createRules() {

        return [
            ...super.createRules(),

            // In Place
            this.createRule({
                test: this.regexService.generateRegex({
                    startsWithTheseWords: [
                        AuthPaths.Views.toAbsolutePath(),
                        AuthPaths.Areas.toAbsolutePath(),
                        AuthPaths.Pages.toAbsolutePath(),
                        // authServerPaths.Pages.toAbsolutePath(),
                    ],
                    endsWithTheseWords: ['scss', 'css'],
                }),
                use: [
                    MergeCommand.prepend({
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            outputPath: (url, resourcePath: string, context) => {
                                const rel = path
                                    .relative(authPaths.toAbsolutePath(), resourcePath)
                                    .replace(/\.scss$/, '.css');

                                const relDir = path.relative(
                                    AuthPaths.wwwroot.toAbsolutePath(),
                                    AuthPaths.toAbsolutePath(),
                                );

                                return path.join(relDir, rel);
                            },
                        },
                    }),
                ],
            }),

            // // Rel to www
            // this.createRule({
            //     test: this.regexService.generateRegex({
            //         startsWithTheseWords: [

            //             // authServerPaths.Pages.Shared['_Layout.cshtml'].toAbsolutePath(),
            //         ],
            //         endsWithTheseWords: ['scss', 'css'],
            //     }),
            //     use: [
            //         MergeCommand.prepend({
            //             loader: 'file-loader',
            //             options: {
            //                 name: '[path][name].[ext]',
            //                 outputPath: (url, resourcePath: string, context) => {
            //                     return path
            //                         .relative(AuthPaths.toAbsolutePath(), resourcePath)
            //                         .replace(/\.scss$/, '.css');
            //                 },
            //             },
            //         }),
            //     ],
            // }),

        

            // Regular
            this.createRule(
                this.mergeService.mergeOptions({
                    test: this.regexService.generateRegex({
                        doesNotStartWithTheseWords: [
                            AuthPaths.Areas.toAbsolutePath(),
                            AuthPaths.Pages.toAbsolutePath(),
                            AuthPaths.Views.toAbsolutePath(),
                        ],
                        endsWithTheseWords: ['.scss', '.css'],
                        doesNotEndsWithTheseWords: ['_export.scss'],
                    }),
                    use: [
                        MergeCommand.prepend(
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    // publicPath: (resourcePath, context) => {
                                    //     return path.relative(path.dirname(resourcePath), context) + '/';
                                    // },
                                    // hmr: true,
                                    // // if hmr does not work, this is a forceful method.
                                    // //reloadAll: true,
                                    // esModule: true,
                                },
                            } as any,

                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                },
                            },
                        ),
                    ],
                }),
            ),
        ];
    }
}
