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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackHtmlWebpackCustomizerPlugin = exports.WebpackHtmlWebpackCustomizerPluginService = void 0;
const webpack_plugin_base_service_1 = require("../webpack-plugin-base/webpack-plugin-base.service");
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const process_webpack_providers_1 = require("@projects/shared/src/functions/process-webpack-providers");
const common_1 = require("@nestjs/common");
let WebpackHtmlWebpackCustomizerPluginService = class WebpackHtmlWebpackCustomizerPluginService extends webpack_plugin_base_service_1.WebpackPluginBaseService {
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
    process_webpack_providers_1.CustomInjectable(),
    __param(0, common_1.Optional()),
    __metadata("design:paramtypes", [Object])
], WebpackHtmlWebpackCustomizerPluginService);
exports.WebpackHtmlWebpackCustomizerPluginService = WebpackHtmlWebpackCustomizerPluginService;
class WebpackHtmlWebpackCustomizerPlugin {
    constructor(options) {
        this.options = options;
    }
    processSrc(argSrc, outputPath) {
        if (!/^https?:/.test(argSrc) && !argSrc.startsWith('_content/')) {
            const baseName = path_1.default.basename(argSrc);
            const destinationPath = path_1.default.resolve(outputPath, baseName);
            if (!fs_1.default.existsSync(destinationPath)) {
                fs_1.default.copyFileSync(argSrc, destinationPath);
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
                };
            }) ?? [];
        data.headTags = stylesheets.concat(headScripts).concat(data.headTags);
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(WebpackHtmlWebpackCustomizerPlugin.name, (compilation) => {
            const outputPath = compiler.options.output.path;
            console.log('The compiler is starting a new compilation...');
            // Static Plugin interface |compilation |HOOK NAME | register listener
            html_webpack_plugin_1.default.getHooks(compilation).alterAssetTagGroups.tapAsync('HtmlWebpackCustomizer', // <-- Set a meaningful name here for stacktraces
            (data, cb) => {
                this.processData(data, compiler);
                cb(null, data);
            });
        });
    }
}
exports.WebpackHtmlWebpackCustomizerPlugin = WebpackHtmlWebpackCustomizerPlugin;
//# sourceMappingURL=webpack-html-webpack-customizer-plugin.service.js.map