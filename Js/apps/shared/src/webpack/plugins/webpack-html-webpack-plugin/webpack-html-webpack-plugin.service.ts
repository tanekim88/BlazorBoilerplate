import { Optional } from '@nestjs/common';
import { CustomInjectable } from '@shared/src/functions/process-providers';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';

@CustomInjectable()
export class WebpackHtmlWebpackPluginService extends WebpackPluginBaseService {
    constructor(@Optional() pluginClass?) {
        super(pluginClass ?? HtmlWebpackPlugin);
    }

    createOptions(options?: HtmlWebpackPlugin.Options) {
        this.mergeService.mergeOptions();

        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                title: this.environmentService.localConfig.title,
                filename: 'index.html',

                // Required
                template: undefined,
                inject: true,

                scriptLoading: 'defer', // {'blocking'|'defer'}
                //favicon: constants.srcFaviconPath,
                meta: {
                    viewport: {
                        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
                    },
                    // 'Content-Security-Policy': {
                    //     'http-equiv': 'Content-Security-Policy',
                    //     content: "default-src https:; script-src https: 'unsafe-inline'",
                    // },
                    charset: {
                        charset: 'utf-8',
                    },
                },
                base: {
                    href: '/',
                    //'target': '_blank'
                },
                minify: {
                    collapseWhitespace: this.environmentService.isProduction,
                    removeComments: this.environmentService.isProduction,
                    removeRedundantAttributes: this.environmentService.isProduction,
                    removeScriptTypeAttributes: this.environmentService.isProduction,
                    removeStyleLinkTypeAttributes: this.environmentService.isProduction,
                    useShortDoctype: this.environmentService.isProduction,
                },
                hash: false,
                cache: true,
                showErrors: true,
                //chunks?
                xhtml: false,
            } as HtmlWebpackPlugin.Options,
            options,
        );
    }
}
