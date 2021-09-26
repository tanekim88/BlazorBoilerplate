"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackStyleRulesService = void 0;
const webpack_rules_base_service_1 = require("../webpack-rules-base/webpack-rules-base.service");
const sass_1 = __importDefault(require("sass"));
const webpack_postcss_service_1 = require("../../postcss/webpack-postcss/webpack-postcss.service");
const process_webpack_providers_1 = require("@projects/shared/src/functions/process-webpack-providers");
const process_webpack_providers_2 = require("@projects/shared/src/functions/process-webpack-providers");
const paths_1 = require("@projects/shared/paths");
const paths_2 = require("@projects/root/paths");
const node_sass_utils_1 = __importDefault(require("node-sass-utils"));
const sass_variables_1 = require("@projects/shared/src/web/material/variables/sass-variables");
const sassUtils = node_sass_utils_1.default(sass_1.default);
let WebpackStyleRulesService = class WebpackStyleRulesService extends webpack_rules_base_service_1.WebpackRulesBaseService {
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
                        implementation: sass_1.default,
                        sassOptions: {
                            includePaths: [
                                paths_1.sharedPaths.node_modules.toAbsolutePath(),
                                paths_2.rootPaths.toAbsolutePath(),
                            ],
                            functions: {
                                'get($keys)': function (keys) {
                                    let result = sass_variables_1.sassVariables;
                                    keys = keys.getValue().split('.');
                                    for (let i = 0; i < keys.length; i++) {
                                        result = result[keys[i]];
                                    }
                                    return sassUtils.castToSass(result);
                                },
                            },
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
    process_webpack_providers_2.CustomInject(webpack_postcss_service_1.WebpackPostcssService),
    __metadata("design:type", webpack_postcss_service_1.WebpackPostcssService)
], WebpackStyleRulesService.prototype, "webpackPostcssService", void 0);
WebpackStyleRulesService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], WebpackStyleRulesService);
exports.WebpackStyleRulesService = WebpackStyleRulesService;
//# sourceMappingURL=webpack-style-rules.service.js.map