import HtmlWebpackPlugin from 'html-webpack-plugin';

import { Compiler } from 'webpack';

import { CustomInjectable } from '@shared/src/functions/process-providers';
import {
    WebpackHtmlWebpackCustomizerPlugin,
    WebpackHtmlWebpackCustomizerPluginService,
} from '@shared/src/webpack/plugins/webpack-html-webpack-customizer-plugin/webpack-html-webpack-customizer-plugin.service';

import { authPaths } from '@auth/paths';

@CustomInjectable()
export class AuthWebpackHtmlWebpackCustomizerPluginService extends WebpackHtmlWebpackCustomizerPluginService {
    constructor() {
        super(AuthWebpackHtmlWebpackCustomizerPlugin);
    }

    createOptions(options?) {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                headScripts: [],
                stylesheets: [],
            },
            options,
        );
    }
}
export class AuthWebpackHtmlWebpackCustomizerPlugin extends WebpackHtmlWebpackCustomizerPlugin {
    apply(compiler: Compiler) {
        compiler.hooks.compilation.tap(AuthWebpackHtmlWebpackCustomizerPlugin.name, (compilation) => {
            // Static Plugin interface |compilation |HOOK NAME | register listener
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
                'HtmlWebpackCustomizer', // <-- Set a meaningful name here for stacktraces
                (data, cb) => {
                    super.processData(data, compiler);
                    const template = data.plugin.options?.template;
                    if (template?.endsWith(authPaths.src.templates['_Layout.cshtml'].toAbsolutePath())) {
                        data.headTags = data.headTags.filter((d) => {
                            const href = d.attributes?.href as string;
                            
                            if(href && (href.startsWith('/Shared_Material__') || href.startsWith('/Auth__'))){
                                return false;
                            }
                            
                            return true;
                        });

                        data.bodyTags = data.bodyTags.filter((d) => {
                            const src = d.attributes?.src as string;
                            
                            if(src && (src.startsWith('/Shared_Material__')  || src.startsWith('/Auth__')) ){
                                return false;
                            }
                            
                            return true;
                        });
                    }
                    

                    cb(null, data);
                },
            );
        });
    }
}
