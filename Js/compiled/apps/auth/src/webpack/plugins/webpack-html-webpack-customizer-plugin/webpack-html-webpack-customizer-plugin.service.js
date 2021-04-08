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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWebpackHtmlWebpackCustomizerPlugin = exports.AuthWebpackHtmlWebpackCustomizerPluginService = void 0;
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
const webpack_html_webpack_customizer_plugin_service_1 = require("@shared/src/webpack/plugins/webpack-html-webpack-customizer-plugin/webpack-html-webpack-customizer-plugin.service");
const paths_1 = require("@auth/paths");
let AuthWebpackHtmlWebpackCustomizerPluginService = class AuthWebpackHtmlWebpackCustomizerPluginService extends webpack_html_webpack_customizer_plugin_service_1.WebpackHtmlWebpackCustomizerPluginService {
    constructor() {
        super(AuthWebpackHtmlWebpackCustomizerPlugin);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            headScripts: [],
            stylesheets: [],
        }, options);
    }
};
AuthWebpackHtmlWebpackCustomizerPluginService = __decorate([
    process_webpack_providers_1.CustomInjectable(),
    __metadata("design:paramtypes", [])
], AuthWebpackHtmlWebpackCustomizerPluginService);
exports.AuthWebpackHtmlWebpackCustomizerPluginService = AuthWebpackHtmlWebpackCustomizerPluginService;
class AuthWebpackHtmlWebpackCustomizerPlugin extends webpack_html_webpack_customizer_plugin_service_1.WebpackHtmlWebpackCustomizerPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(AuthWebpackHtmlWebpackCustomizerPlugin.name, (compilation) => {
            // Static Plugin interface |compilation |HOOK NAME | register listener
            html_webpack_plugin_1.default.getHooks(compilation).alterAssetTagGroups.tapAsync('HtmlWebpackCustomizer', // <-- Set a meaningful name here for stacktraces
            (data, cb) => {
                super.processData(data, compiler);
                const template = data.plugin.options?.template;
                if (template?.endsWith(paths_1.authPaths.src.templates['_Layout.cshtml'].toAbsolutePath())) {
                    data.headTags = data.headTags.filter((d) => {
                        const href = d.attributes?.href;
                        if (href && (href.startsWith('/Shared_Material__') || href.startsWith('/Auth__'))) {
                            return false;
                        }
                        return true;
                    });
                    data.bodyTags = data.bodyTags.filter((d) => {
                        const src = d.attributes?.src;
                        if (src && (src.startsWith('/Shared_Material__') || src.startsWith('/Auth__'))) {
                            return false;
                        }
                        return true;
                    });
                }
                cb(null, data);
            });
        });
    }
}
exports.AuthWebpackHtmlWebpackCustomizerPlugin = AuthWebpackHtmlWebpackCustomizerPlugin;
//# sourceMappingURL=webpack-html-webpack-customizer-plugin.service.js.map