var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import fs from 'fs';
import { CustomInjectable } from '#shared/src/functions/process-providers';
import { Optional } from '@nestjs/common';
let WebpackHtmlWebpackCustomizerPluginService = class WebpackHtmlWebpackCustomizerPluginService extends WebpackPluginBaseService {
    constructor(options) {
        super(options ?? WebpackHtmlWebpackCustomizerPlugin);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            headScripts: [],
            stylesheets: [
                'https://fonts.googleapis.com/icon?family=Material+Icons',
                'https://fonts.googleapis.com/css?family=Roboto:300,400,500|Material+Icons&display=swap'
            ],
        }, options);
    }
};
WebpackHtmlWebpackCustomizerPluginService = __decorate([
    CustomInjectable(),
    __param(0, Optional()),
    __metadata("design:paramtypes", [Object])
], WebpackHtmlWebpackCustomizerPluginService);
export { WebpackHtmlWebpackCustomizerPluginService };
export class WebpackHtmlWebpackCustomizerPlugin {
    options;
    constructor(options) {
        this.options = options;
    }
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
                    meta: null
                };
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
                    meta: null
                };
            }) ?? [];
        data.headTags = stylesheets.concat(headScripts).concat(data.headTags);
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(WebpackHtmlWebpackCustomizerPlugin.name, (compilation) => {
            const outputPath = compiler.options.output.path;
            console.log('The compiler is starting a new compilation...');
            // Static Plugin interface |compilation |HOOK NAME | register listener
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('HtmlWebpackCustomizer', // <-- Set a meaningful name here for stacktraces
            (data, cb) => {
                this.processData(data, compiler);
                cb(null, data);
            });
        });
    }
}
//# sourceMappingURL=webpack-html-webpack-customizer-plugin.service.js.map