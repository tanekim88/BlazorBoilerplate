"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWebpackStyleRulesService = void 0;
const webpack_style_rules_service_1 = require("@shared/src/webpack/rules/webpack-style-rules/webpack-style-rules.service");
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
const merge_command_1 = require("@shared/src/modules/utilities/merge/merge/merge-command");
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const paths_1 = require("@auth/paths");
const path_1 = __importDefault(require("path"));
let AuthWebpackStyleRulesService = class AuthWebpackStyleRulesService extends webpack_style_rules_service_1.WebpackStyleRulesService {
    createRule(options) {
        return this.mergeService.mergeOptions(super.createRule(), {}, options);
    }
    createRules() {
        return [
            ...super.createRules(),
            // In Place
            this.createRule({
                test: this.regexService.generateRegex({
                    startsWithTheseWords: [
                        paths_1.AuthPaths.Views.toAbsolutePath(),
                        paths_1.AuthPaths.Areas.toAbsolutePath(),
                        paths_1.AuthPaths.Pages.toAbsolutePath(),
                    ],
                    endsWithTheseWords: ['scss', 'css'],
                }),
                use: [
                    merge_command_1.MergeCommand.prepend({
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            outputPath: (url, resourcePath, context) => {
                                const rel = path_1.default
                                    .relative(paths_1.authPaths.toAbsolutePath(), resourcePath)
                                    .replace(/\.scss$/, '.css');
                                const relDir = path_1.default.relative(paths_1.AuthPaths.wwwroot.toAbsolutePath(), paths_1.AuthPaths.toAbsolutePath());
                                return path_1.default.join(relDir, rel);
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
            this.createRule(this.mergeService.mergeOptions({
                test: this.regexService.generateRegex({
                    doesNotStartWithTheseWords: [
                        paths_1.AuthPaths.Areas.toAbsolutePath(),
                        paths_1.AuthPaths.Pages.toAbsolutePath(),
                        paths_1.AuthPaths.Views.toAbsolutePath(),
                    ],
                    endsWithTheseWords: ['.scss', '.css'],
                    doesNotEndsWithTheseWords: ['_export.scss'],
                }),
                use: [
                    merge_command_1.MergeCommand.prepend({
                        loader: mini_css_extract_plugin_1.default.loader,
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
AuthWebpackStyleRulesService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], AuthWebpackStyleRulesService);
exports.AuthWebpackStyleRulesService = AuthWebpackStyleRulesService;
//# sourceMappingURL=webpack-style-rules.service.js.map