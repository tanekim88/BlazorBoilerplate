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
exports.WebpackWebpackPwaManifestService = void 0;
const webpack_plugin_base_service_1 = require("../webpack-plugin-base/webpack-plugin-base.service");
const webpack_pwa_manifest_1 = __importDefault(require("webpack-pwa-manifest"));
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
let WebpackWebpackPwaManifestService = class WebpackWebpackPwaManifestService extends webpack_plugin_base_service_1.WebpackPluginBaseService {
    constructor() {
        super(webpack_pwa_manifest_1.default);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            name: 'My Progressive Web App',
            short_name: 'MyPWA',
            description: 'My awesome Progressive Web App!',
            background_color: '#ffffff',
            crossorigin: 'use-credentials',
            icons: [
            // {
            //     src: path.resolve('src/assets/icon.png'),
            //     sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            // },
            // {
            //     src: path.resolve('src/assets/large-icon.png'),
            //     size: '1024x1024', // you can also use the specifications pattern
            // },
            // {
            //     src: path.resolve('src/assets/maskable-icon.png'),
            //     size: '1024x1024',
            //     purpose: 'maskable',
            // },
            ],
        }, options);
    }
};
WebpackWebpackPwaManifestService = __decorate([
    process_webpack_providers_1.CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackWebpackPwaManifestService);
exports.WebpackWebpackPwaManifestService = WebpackWebpackPwaManifestService;
//# sourceMappingURL=webpack-webpack-pwa-manifest.service.js.map