var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WebpackStyleRulesService } from '#shared/src/webpack/rules/webpack-style-rules/webpack-style-rules.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';
import { MergeCommand } from '#shared/src/modules/utilities/merge/merge/merge-command';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BlazorAppPaths, blazorAppPaths } from '#solid-app/paths';
import path from 'path';
let BlazorAppWebpackStyleRulesService = class BlazorAppWebpackStyleRulesService extends WebpackStyleRulesService {
    createRule(options) {
        return this.mergeService.mergeOptions(super.createRule(), {}, options);
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
                            outputPath: (url, resourcePath, context) => {
                                const rel = path
                                    .relative(blazorAppPaths.toAbsolutePath(), resourcePath)
                                    .replace(/\.scss$/, '.css');
                                const relDir = path.relative(BlazorAppPaths.wwwroot.toAbsolutePath(), BlazorAppPaths.toAbsolutePath());
                                return path.join(relDir, rel);
                            },
                        },
                    }),
                ],
            }),
            this.createRule(this.mergeService.mergeOptions({
                test: this.regexService.generateRegex({
                    doesNotStartWithTheseWords: [
                        BlazorAppPaths.Pages.toAbsolutePath(),
                        BlazorAppPaths.Shared.toAbsolutePath(),
                    ],
                    endsWithTheseWords: ['.scss', '.css'],
                    doesNotEndsWithTheseWords: ['_export.scss'],
                }),
                use: [
                    MergeCommand.prepend({
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
                    }, {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    }),
                ],
            })),
        ];
    }
};
BlazorAppWebpackStyleRulesService = __decorate([
    CustomInjectable()
], BlazorAppWebpackStyleRulesService);
export { BlazorAppWebpackStyleRulesService };
//# sourceMappingURL=webpack-style-rules.service.js.map