import HtmlWebpackPlugin from 'html-webpack-plugin';

import { WebpackHtmlWebpackPluginService } from '@shared/src/webpack/plugins/webpack-html-webpack-plugin/webpack-html-webpack-plugin.service';
import { CustomInject, CustomInjectable } from '@shared/src/functions/process-providers';
import { authPaths, AuthPaths } from '@auth/paths';
import { authConfig } from '@auth/configs';
import { AuthEnvironmentService } from '@auth/src/modules/environment/environment/environment.service';


@CustomInjectable()
export class AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath extends WebpackHtmlWebpackPluginService {
    @CustomInject(AuthEnvironmentService)
    private authEnvironmentService: AuthEnvironmentService;

    createOptions(options?: HtmlWebpackPlugin.Options) {
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

                scriptLoading: 'defer', // {'blocking'|'defer'}
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
                    //'target': '_blank'
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
}
