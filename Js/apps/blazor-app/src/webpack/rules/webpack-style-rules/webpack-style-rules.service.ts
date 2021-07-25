import { RuleSetRule } from 'webpack';

import { WebpackStyleRulesService } from '@shared/src/webpack/rules/webpack-style-rules/webpack-style-rules.service';

import { CustomInjectable } from '@shared/src/functions/process-providers';
import { MergeCommand } from '@shared/src/modules/utilities/merge/merge/merge-command';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BlazorAppPaths, blazorAppPaths } from '@blazor-app/paths';
import path from 'path';
@CustomInjectable()
export class BlazorAppWebpackStyleRulesService extends WebpackStyleRulesService {
    createRule(options?: RuleSetRule): RuleSetRule {
        return this.mergeService.mergeOptions(super.createRule(), {} as RuleSetRule, options);
    }

    createRules() {
        return [
            ...super.createRules(),

            this.createRule({
                test: this.regexService.generateRegex({
                    startsWithTheseWords: [
                        BlazorAppPaths.Pages.toAbsolutePath(),
                        BlazorAppPaths.Shared.toAbsolutePath(),
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
                                    .relative(blazorAppPaths.toAbsolutePath(), resourcePath)
                                    .replace(/\.scss$/, '.css');

                                const relDir = path.relative(
                                    BlazorAppPaths.wwwroot.toAbsolutePath(),
                                    BlazorAppPaths.toAbsolutePath(),
                                );

                                return path.join(relDir, rel);
                            },
                        },
                    }),
                ],
            }),
            this.createRule(
                this.mergeService.mergeOptions({
                    test: this.regexService.generateRegex({
                        doesNotStartWithTheseWords: [
                            BlazorAppPaths.Pages.toAbsolutePath(),
                            BlazorAppPaths.Shared.toAbsolutePath(),
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
