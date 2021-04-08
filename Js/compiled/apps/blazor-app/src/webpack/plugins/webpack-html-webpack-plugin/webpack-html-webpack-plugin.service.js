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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath = void 0;
const webpack_html_webpack_plugin_service_1 = require("@shared/src/webpack/plugins/webpack-html-webpack-plugin/webpack-html-webpack-plugin.service");
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
const paths_1 = require("@blazor-app/paths");
const configs_1 = require("@blazor-app/configs");
const environment_service_1 = require("@blazor-app/src/modules/environment/environment/environment.service");
let BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath = class BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath extends webpack_html_webpack_plugin_service_1.WebpackHtmlWebpackPluginService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
    createManyPlugins() {
        const isProduction = this.blazorAppClientEnvironmentService.isProduction;
        return [
            this.createPlugin({
                title: configs_1.blazorAppConfig.title,
                filename: 'index.html',
                // Required
                template: paths_1.blazorAppPaths.src.templates['index.html'].toAbsolutePath(),
                inject: false,
                scriptLoading: 'defer',
                //favicon: webpackConstants.srcFaviconPath,
                // meta: [
                //     {
                //         name: 'viewport',
                //         content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
                //     },
                //     {
                //         charset: 'utf-8'
                //     }
                // ] as any,
                base: {
                    href: '/',
                },
                minify: {
                    collapseWhitespace: isProduction,
                    removeComments: isProduction,
                    removeRedundantAttributes: isProduction,
                    removeScriptTypeAttributes: isProduction,
                    removeStyleLinkTypeAttributes: isProduction,
                    useShortDoctype: isProduction,
                },
                // hash: true,
                cache: true,
                showErrors: true,
                //chunks?
                xhtml: false,
            }),
        ];
    }
};
__decorate([
    process_webpack_providers_1.CustomInject(environment_service_1.BlazorAppEnvironmentService),
    __metadata("design:type", environment_service_1.BlazorAppEnvironmentService)
], BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath.prototype, "blazorAppClientEnvironmentService", void 0);
BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath = __decorate([
    process_webpack_providers_1.CustomInjectable()
], BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath);
exports.BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath = BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath;
//# sourceMappingURL=webpack-html-webpack-plugin.service.js.map