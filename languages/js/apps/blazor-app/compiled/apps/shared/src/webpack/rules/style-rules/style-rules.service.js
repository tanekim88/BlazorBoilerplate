var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
import { WebpackRulesBaseService } from '../webpack-rules-base/webpack-rules-base.service';
import sass from 'sass';
import { WebpackPostcssService } from '../../postcss/webpack-postcss/webpack-postcss.service';
import { CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { CustomInject } from '@projects/shared/src/functions/process-providers';
import { sharedPaths } from '@projects/shared/paths';
import { rootPaths } from '@projects/root/paths';
import nodeSassUtils from 'node-sass-utils';
import { sassVariables } from '@projects/shared/src/web/material/variables/sass-variables';
const sassUtils = nodeSassUtils(sass);
let WebpackStyleRulesService = class WebpackStyleRulesService extends WebpackRulesBaseService {
    webpackPostcssService;
    createRule(options) {
        return this.mergeService.mergeOptions(super.createRule(), {
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
                                    let result = sassVariables;
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
        }, options);
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
};
__decorate([
    CustomInject(WebpackPostcssService),
    __metadata("design:type", typeof (_a = typeof WebpackPostcssService !== "undefined" && WebpackPostcssService) === "function" ? _a : Object)
], WebpackStyleRulesService.prototype, "webpackPostcssService", void 0);
WebpackStyleRulesService = __decorate([
    CustomInjectable()
], WebpackStyleRulesService);
export { WebpackStyleRulesService };
//# sourceMappingURL=style-rules.service.js.map