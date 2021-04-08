import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';
import HtmlWebpackPlugin, { HtmlTagObject } from 'html-webpack-plugin';
import path from 'path';
import { Compiler } from 'webpack';
import fs from 'fs';
import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { Optional } from '@nestjs/common';

@CustomInjectable()
export class WebpackHtmlWebpackCustomizerPluginService extends WebpackPluginBaseService {
    constructor(@Optional() options?) {
        super(options ?? WebpackHtmlWebpackCustomizerPlugin);
    }

    createOptions(options?) {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                headScripts: [],
                stylesheets: [
                    'https://fonts.googleapis.com/icon?family=Material+Icons',
                    'https://fonts.googleapis.com/css?family=Roboto:300,400,500|Material+Icons&display=swap'
                ],
            },
            options,
        );
    }
}
export class WebpackHtmlWebpackCustomizerPlugin {
    constructor(private options) {}

    processSrc(argSrc, outputPath) {
        if (!/^https?:/.test(argSrc) && !argSrc.startsWith('_content/')) {
            const baseName = path.basename(argSrc);
            const destinationPath = path.resolve(outputPath, baseName);

            if (!fs.existsSync(destinationPath)) {
                fs.copyFileSync(argSrc, destinationPath);
            }

            return '/' + baseName;
        }

        return argSrc;
    }

    processData(data, compiler) {
        const outputPath = compiler.options.output.path;
        let { headScripts, stylesheets } = this.options;

        headScripts =
            headScripts?.map((argSrc) => {
                const src = this.processSrc(argSrc, outputPath);

                return {
                    attributes: {
                        src: src,
                    },
                    tagName: 'script',
                    voidTag: false,
                    meta:null
                } as HtmlTagObject;
            }) ?? [];

        stylesheets =
            stylesheets?.map((argSrc) => {
                const src = this.processSrc(argSrc, outputPath);

                return {
                    attributes: {
                        href: src,
                        rel: 'stylesheet',
                    },
                    tagName: 'link',
                    voidTag: true,
                    meta:null
                } as HtmlTagObject;
            }) ?? [];

        data.headTags = stylesheets.concat(headScripts).concat(data.headTags);
    }

    apply(compiler: Compiler) {
        compiler.hooks.compilation.tap(WebpackHtmlWebpackCustomizerPlugin.name, (compilation) => {
            const outputPath = compiler.options.output.path;

            console.log('The compiler is starting a new compilation...');

            // Static Plugin interface |compilation |HOOK NAME | register listener
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
                'HtmlWebpackCustomizer', // <-- Set a meaningful name here for stacktraces
                (data, cb) => {
                    this.processData(data, compiler);
                    cb(null, data);
                },
            );
        });
    }
}
