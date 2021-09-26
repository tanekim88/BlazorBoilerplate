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
exports.AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath = void 0;
const webpack_html_webpack_plugin_service_1 = require("#shared/src/webpack/plugins/webpack-html-webpack-plugin/webpack-html-webpack-plugin.service");
const process_webpack_providers_1 = require("#shared/src/functions/process-webpack-providers");
const paths_1 = require("#auth/paths");
const configs_1 = require("#auth/configs");
const environment_service_1 = require("#auth/src/modules/environment/environment/environment.service");
let AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath = class AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath extends webpack_html_webpack_plugin_service_1.WebpackHtmlWebpackPluginService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
    createManyPlugins() {
        const isProduction = this.authEnvironmentService.isProduction;
        return [
            this.createPlugin({
                title: configs_1.authConfig.title,
                filename: 'index.html',
                // Required
                template: paths_1.authPaths.src.templates['index.html'].toAbsolutePath(),
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
            this.createPlugin({
                title: configs_1.authConfig.title,
                filename: paths_1.AuthPaths.Pages.Shared['_Layout.cshtml'].toAbsolutePath(),
                // Required
                template: paths_1.authPaths.src.templates['Layout.cshtml'].toAbsolutePath(),
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
    process_webpack_providers_1.CustomInject(environment_service_1.AuthEnvironmentService),
    __metadata("design:type", environment_service_1.AuthEnvironmentService)
], AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath.prototype, "authEnvironmentService", void 0);
AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath = __decorate([
    process_webpack_providers_1.CustomInjectable()
], AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath);
exports.AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath = AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath;
//# sourceMappingURL=webpack-html-webpack-plugin.service.js.map