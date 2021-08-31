var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import { CustomInjectable } from '#shared/src/functions/process-providers';
let WebpackWebpackPwaManifestService = class WebpackWebpackPwaManifestService extends WebpackPluginBaseService {
    constructor() {
        super(WebpackPwaManifest);
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
    CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackWebpackPwaManifestService);
export { WebpackWebpackPwaManifestService };
//# sourceMappingURL=webpack-webpack-pwa-manifest.service.js.map