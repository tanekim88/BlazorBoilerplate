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
exports.WebpackHtmlWebpackPluginService = void 0;
const common_1 = require("@nestjs/common");
const process_webpack_providers_1 = require("@projects/shared/src/functions/process-webpack-providers");
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const webpack_plugin_base_service_1 = require("../webpack-plugin-base/webpack-plugin-base.service");
let WebpackHtmlWebpackPluginService = class WebpackHtmlWebpackPluginService extends webpack_plugin_base_service_1.WebpackPluginBaseService {
    constructor(pluginClass) {
        super(pluginClass ?? html_webpack_plugin_1.default);
    }
    createOptions(options) {
        this.mergeService.mergeOptions();
        return this.mergeService.mergeOptions(super.createOptions(), {
            title: this.environmentService.localConfig.title,
            filename: 'index.html',
            // Required
            template: undefined,
            inject: true,
            scriptLoading: 'defer',
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
        }, options);
    }
};
WebpackHtmlWebpackPluginService = __decorate([
    process_webpack_providers_1.CustomInjectable(),
    __param(0, common_1.Optional()),
    __metadata("design:paramtypes", [Object])
], WebpackHtmlWebpackPluginService);
exports.WebpackHtmlWebpackPluginService = WebpackHtmlWebpackPluginService;
//# sourceMappingURL=webpack-html-webpack-plugin.service.js.map