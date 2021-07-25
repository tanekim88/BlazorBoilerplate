import HtmlWebpackPlugin from 'html-webpack-plugin';

import { WebpackHtmlWebpackPluginService } from '@shared/src/webpack/plugins/webpack-html-webpack-plugin/webpack-html-webpack-plugin.service';
import { CustomInject, CustomInjectable } from '@shared/src/functions/process-providers';
import { blazorAppPaths } from '@blazor-app/paths';
import { blazorAppConfig } from '@blazor-app/configs';
import { BlazorAppEnvironmentService } from '@blazor-app/src/modules/environment/environment/environment.service';

@CustomInjectable()
export class BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath extends WebpackHtmlWebpackPluginService {
    @CustomInject(BlazorAppEnvironmentService)
    private blazorAppClientEnvironmentService: BlazorAppEnvironmentService;

    createOptions(options?: HtmlWebpackPlugin.Options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }

    createManyPlugins() {
        const isProduction = this.blazorAppClientEnvironmentService.isProduction;
        return [
            this.createPlugin({
                title: blazorAppConfig.title,
                filename: 'index.html',

                // Required
                template: blazorAppPaths.src.templates['index.html'].toAbsolutePath(),
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
