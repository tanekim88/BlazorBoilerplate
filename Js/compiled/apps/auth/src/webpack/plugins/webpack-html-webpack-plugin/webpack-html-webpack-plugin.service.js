var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WebpackHtmlWebpackPluginService } from '@shared/src/webpack/plugins/webpack-html-webpack-plugin/webpack-html-webpack-plugin.service';
import { CustomInject, CustomInjectable } from '@shared/src/functions/process-providers';
import { authPaths, AuthPaths } from '@auth/paths';
import { authConfig } from '@auth/configs';
import { AuthEnvironmentService } from '@auth/src/modules/environment/environment/environment.service';
let AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath = class AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath extends WebpackHtmlWebpackPluginService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
    createManyPlugins() {
        const isProduction = this.authEnvironmentService.isProduction;
        return [
            this.createPlugin({
                title: authConfig.title,
                filename: AuthPaths.Pages.Shared['_Layout.cshtml'].toAbsolutePath(),
                // Required
                template: authPaths.src.templates['_Layout.cshtml'].toAbsolutePath(),
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
    CustomInject(AuthEnvironmentService),
    __metadata("design:type", AuthEnvironmentService)
], AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath.prototype, "authEnvironmentService", void 0);
AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath = __decorate([
    CustomInjectable()
], AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath);
export { AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath };
//# sourceMappingURL=webpack-html-webpack-plugin.service.js.map